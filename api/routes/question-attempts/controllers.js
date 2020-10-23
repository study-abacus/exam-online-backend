const BaseCreateController = require('base/controllers/createController');
const DB = require('models');
const { getExamAttemptId } = require('./utils');

class QuestionAttemptCreateController extends BaseCreateController {
  model = DB.questionAttempts;
  
  async beforeCreate(model) {
    const { questionId } = model;

    model.examAttemptId = await getExamAttemptId(questionId, this.request.user.id);
  }
}

module.exports = {
    QuestionAttemptCreateController,
};
