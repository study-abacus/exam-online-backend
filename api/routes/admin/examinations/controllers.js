const BaseListController = require('base/controllers/listController');
const BaseDetailController = require('base/controllers/detailController');
const BaseCreateController = require('base/controllers/createController');
const BaseUpdateController = require('base/controllers/updateController');
const BaseDeleteController = require('base/controllers/deleteController');
const DB = require('models');
const ExaminationSerializerOpts = require('serializer-opts/admin/examination');
const QuestionSerializerOpts = require('serializer-opts/admin/question');
const PracticePaperSerializerOpts = require('serializer-opts/admin/practice-papers');

class ExaminationListController extends BaseListController {
  model = DB.examinations;
  modelName = DB.examinations.name;
  serializerOpts = ExaminationSerializerOpts(DB.examinations.name);

  generateOrderClause() {
    return ['id'];
  }
}

class RelationshipQuestionController extends BaseListController {
  model = DB.questions;
  modelName = DB.questions.name;
  serializerOpts = QuestionSerializerOpts(DB.questions.name);

  generateWhereClause() {
    return {
      examinationId: this.request.params.id,
    };
  }

  generateOrderClause() {
    return ['id'];
  }
}

class RelationshipPracticePaperController extends BaseListController {
  model = DB.practicePapers;
  modelName = DB.practicePapers.name;
  serializerOpts = PracticePaperSerializerOpts(DB.practicePapers.name);

  generateWhereClause() {
    return {
      examinationId: this.request.params.id,
    };
  }
}

class ExaminationCreateController extends BaseCreateController {
  model = DB.examinations;
  modelName = DB.examinations.name;
  serializerOpts = ExaminationSerializerOpts(DB.examinations.name);
}

class ExaminationUpdateController extends BaseUpdateController {
  model = DB.examinations;
  modelName = DB.examinations.name;
  serializerOpts = ExaminationSerializerOpts(DB.examinations.name);
}

class ExaminationDetailController extends BaseDetailController {
  model = DB.examinations;
  modelName = DB.examinations.name;
  serializerOpts = ExaminationSerializerOpts(DB.examinations.name);
}

class ExaminationDeleteController extends BaseDeleteController {
  model = DB.examinations;
  modelName = DB.examinations.name;
  serializerOpts = ExaminationSerializerOpts(DB.examinations.name);
}

module.exports = {
  ExaminationListController,
  RelationshipQuestionController,
  ExaminationDetailController,
  RelationshipPracticePaperController,
  ExaminationCreateController,
  ExaminationUpdateController,
  ExaminationDeleteController,
};
