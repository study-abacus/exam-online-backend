const DB = require('models');
const BaseListController = require('base/controllers/listController');
const BaseDetailController = require('base/controllers/detailController');
const ExaminationSerializerOpts = require('serializer-opts/examination');

class ExaminationListController extends BaseListController {
  model = DB.examinations;
  modelName = DB.examinations.name;
  serializerOpts = ExaminationSerializerOpts(DB.examinations.name);

  generateOrderClause() {
    return ['id'];
  }
}

class ExaminationDetailController extends BaseDetailController {
  model = DB.examinations;
  modelName = DB.examinations.name;
  serializerOpts = ExaminationSerializerOpts(DB.examinations.name);
}

module.exports = {
  ExaminationListController,
  ExaminationDetailController,
};
