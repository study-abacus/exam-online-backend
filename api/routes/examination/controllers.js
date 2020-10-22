const BaseListController = require('base/controllers/listController');
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

module.exports = {
  ExaminationListController,
  RelationshipQuestionController,
};
