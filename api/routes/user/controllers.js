const BaseDetailController = require('base/controllers/detailController');
const DB = require('models');

class UserDetailController extends BaseDetailController {
  model = DB.users
}

module.exports = {
  UserDetailController
}
