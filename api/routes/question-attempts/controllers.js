const BaseDetailController = require('base/controllers/detailController');
const BaseCreateController = require('base/controllers/createController');
const BaseUpdateController = require('base/controllers/updateController');
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

module.exports = {
  QuestionAttemptDetailController,
  QuestionAttemptCreateController,
  QuestionAttemptUpdateController,
};
