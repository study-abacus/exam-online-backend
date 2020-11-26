const BaseDetailController = require('base/controllers/detailController');
const BaseCreateController = require('base/controllers/createController');
const BaseUpdateController = require('base/controllers/updateController');
const BaseListController = require('base/controllers/listController');
const DB = require('models');
const { getExamAttemptId } = require('./utils');

class QuestionAttemptDetailController extends BaseDetailController {
  model = DB.questionAttempts;
}

class QuestionAttemptCreateController extends BaseCreateController {
  model = DB.questionAttempts;

  async beforeCreate(model) {
    const { questionId } = model;

    model.examAttemptId = await getExamAttemptId(questionId, this.request.user.id);
  }
}

class QuestionAttemptUpdateController extends BaseUpdateController {
  model = DB.questionAttempts;
}

class QuestionAttemptsController extends BaseListController {
  model = DB.questionAttempts;

  async getObjectsAndCount() {
    const examinationAttempt = await DB.examAttempts.findOne({
      where: {
        userId: this.request.user.id,
        examinationId: this.request.params.examinationId,
      },
    });

    return this.model.findAndCountAll({
      where: {
        ...this.generateWhereClause(),
        examAttemptId: examinationAttempt.id,
      },
      include: this.generateIncludeClause(),
      order: this.generateOrderClause(),
    });
  }
}

module.exports = {
  QuestionAttemptDetailController,
  QuestionAttemptCreateController,
  QuestionAttemptUpdateController,
  QuestionAttemptsController,
};
