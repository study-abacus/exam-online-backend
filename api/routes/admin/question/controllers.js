const BaseDetailController = require('base/controllers/detailController');
const BaseListController = require('base/controllers/listController');
const BaseCreateController = require('base/controllers/createController');
const BaseUpdateController = require('base/controllers/updateController');
const DB = require('models');

class QuestionDetailController extends BaseDetailController {
  model = DB.questions;

  defaultExcludes = ['questionAttempts'];

  generateIncludeClause() {
    const include = super.generateIncludeClause();

    return [
      ...include,
      {
        model: DB.questionAttempts,
        include: {
          model: DB.examAttempts,
          where: {
            userId: this.request.user.id,
          },
          required: true,
        },
      },
    ];
  }
}

class QuestionCreateController extends BaseCreateController {
  model = DB.questions;
}

class QuestionsUpdateController extends BaseUpdateController {
  model = DB.questions;
}

class CurrentQuestionAttemptController extends BaseDetailController {
  model = DB.questionAttempts;

  getObject() {
    return this.model.findOne({
      where: {
        questionId: this.request.params.id,
      },
      include: {
        model: DB.examAttempts,
        where: {
          userId: this.request.body.userId,
        },
        required: true,
      },
    });
  }

  async get() {
    const instance = await this.getObject();

    if (!instance) {
      return {
        data: null,
      };
    }
    return this.serialize(instance);
  }
}

class QuestionsListController extends BaseListController {
  model = DB.questions;
}

module.exports = {
  QuestionDetailController,
  CurrentQuestionAttemptController,
  QuestionsListController,
  QuestionCreateController,
  QuestionsUpdateController,
};
