const BaseController = require('base/controllers/baseController');
const BaseDetailController = require('base/controllers/detailController');
const BaseListController = require('base/controllers/listController');
const DB = require('models');

class ExamAttemptDetailController extends BaseDetailController {
  model = DB.examAttempts;
}

class ExamAttemptListController extends BaseListController {
  model = DB.examAttempts;

  generateWhereClause() {
    return {
      userId: this.request.user.id,
    };
  }
}

class ExamAttemptSubmitController extends BaseController {
  async post() {
    const examAttempt = await DB.examAttempts.findByPk(this.request.params.id);

    if (!examAttempt) {
      this.response.callNotFound();
    }

    examAttempt.isSubmitted = true;
    await examAttempt.save();

    this.response.status(204).send({});
  }
}

module.exports = {
  ExamAttemptDetailController,
  ExamAttemptListController,
  ExamAttemptSubmitController,
};
