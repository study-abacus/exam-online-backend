const BaseListController = require('base/controllers/listController');
const BaseDetailController = require('base/controllers/detailController');
const DB = require('models');

class ExaminationListController extends BaseListController {
  model = DB.examinations;
}

class RelationshipQuestionController extends BaseListController {
  model = DB.questions;
  generateWhereClause() {
    return {
      examinationId: this.request.params.id,
    };
  }
}

class RelationshipPracticePaperController extends BaseListController {
  model = DB.practicePapers;

  generateWhereClause() {
    return {
      examinationId: this.request.params.id,
    };
  }
}

class ExaminationDetailController extends BaseDetailController {
  model = DB.examinations;
}

class CurrentExamAttemptController extends BaseDetailController {
  model = DB.examAttempts;
  generateWhereClause() {
    return {
      examinationId: this.request.params.id,
      userId: this.request.user.id,
    };
  }
}

module.exports = {
  ExaminationListController,
  RelationshipQuestionController,
  ExaminationDetailController,
  CurrentExamAttemptController,
  RelationshipPracticePaperController,
};
