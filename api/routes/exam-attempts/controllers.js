const BaseDetailController = require('base/controllers/detailController');
const BaseListController = require('base/controllers/listController');
const DB = require('models');

class ExamAttemptDetailController extends BaseDetailController {
  model = DB.examAttempts

  generateWhereClause() {
    return {
      userId: this.request.user.id
    }
  }
}

class ExamAttemptListController extends BaseListController {
  model = DB.examAttempts

  generateWhereClause() {
    return {
      userId: this.request.user.id
    }
  }
}

module.exports = {
  ExamAttemptDetailController,
  ExamAttemptListController
}
