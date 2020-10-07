const BaseListController = require('base/controllers/listController');
const DB = require('models');

class ExaminationListController extends BaseListController {
  model = DB.examinations
}

module.exports = {
  ExaminationListController
}
