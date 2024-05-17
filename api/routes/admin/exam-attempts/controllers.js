const BaseDetailController = require('base/controllers/detailController');
const BaseListController = require('base/controllers/listController');
const BaseCreateController = require('base/controllers/createController');
const BaseUpdateController = require('base/controllers/updateController');
const DB = require('models');
const ExamAttemptSerializerOpts = require('serializer-opts/admin/exam-attempts');

class ExamAttemptDetailController extends BaseDetailController {
  model = DB.examAttempts;
  modelName = DB.examAttempts.name;
  serializerOpts = ExamAttemptSerializerOpts(DB.examAttempts.name);
}

class ExamAttemptCreateController extends BaseCreateController {
  model = DB.examAttempts;
  modelName = DB.examAttempts.name;
  serializerOpts = ExamAttemptSerializerOpts(DB.examAttempts.name);
  deserializerOpts = ExamAttemptSerializerOpts(DB.examAttempts.name, 'deserialize');

  async beforeCreate(model) {
    if (!model.start) {
      const examination = await DB.examinations.findByPk(model.examinationId);
      model.start = examination.start;
    }
  }
}

class ExamAttemptUpdateController extends BaseUpdateController {
  model = DB.examAttempts;
  modelName = DB.examAttempts.name;
  serializerOpts = ExamAttemptSerializerOpts(DB.examAttempts.name);
  deserializerOpts = ExamAttemptSerializerOpts(DB.examAttempts.name, 'deserialize');
}

class ExamAttemptListController extends BaseListController {
  model = DB.examAttempts;
  modelName = DB.examAttempts.name;
  serializerOpts = ExamAttemptSerializerOpts(DB.examAttempts.name);

  generateWhereClause() {
    return {
      userId: this.request.params.id,
    };
  }
}

module.exports = {
  ExamAttemptDetailController,
  ExamAttemptListController,
  ExamAttemptCreateController,
  ExamAttemptUpdateController,
};
