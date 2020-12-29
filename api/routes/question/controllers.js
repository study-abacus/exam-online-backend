const BaseDetailController = require('base/controllers/detailController');
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
        required: true,
      },
    ];
  }
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
          userId: this.request.user.id,
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

module.exports = {
  QuestionDetailController,
  CurrentQuestionAttemptController,
};
