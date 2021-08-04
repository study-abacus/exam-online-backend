const BaseDetailController = require('base/controllers/detailController');
const BaseListController = require('base/controllers/listController');
const DB = require('models');

class UserDetailController extends BaseDetailController {
  model = DB.users;
}

class UserListController extends BaseListController {
  model = DB.users;
}

class UserExamAttemptsDetailController extends BaseListController {
  model = DB.examAttempts;
}

module.exports = {
  UserDetailController,
  UserListController,
  UserExamAttemptsDetailController,
};
