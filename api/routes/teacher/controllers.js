const BaseListController = require('base/controllers/listController');
const DB = require('models');

class TeacherListController extends BaseListController {
  model = DB.teachers
}

module.exports = {
  TeacherListController
}
