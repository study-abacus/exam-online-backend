const BaseListController = require('base/controllers/listController');
const DB = require('models');

class TeacherListController extends BaseListController {
  model = DB.teachers

  generateOrderClause() {
    return [
      ['name', 'ASC']
    ]
  }
}

module.exports = {
  TeacherListController
}
