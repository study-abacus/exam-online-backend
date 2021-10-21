const BaseDetailController = require('base/controllers/detailController');
const BaseListController = require('base/controllers/listController');
const DB = require('models');
const UserSerializerOpts = require('serializer-opts/admin/user');
const ExamAttemptSerializerOpts = require('serializer-opts/admin/exam-attempts');

class UserDetailController extends BaseDetailController {
  model = DB.users;
  modelName = DB.users.name;
  serializerOpts = UserSerializerOpts(DB.users);

  async getMe() {
    const user = await this.model.findByPk(this.request.user.id, {
      include: {
        model: DB.profiles,
      },
    });

    return this.serialize(user);
  }
}

class UserListController extends BaseListController {
  model = DB.users;
  modelName = DB.users.name;
  serializerOpts = UserSerializerOpts(DB.users);
}

class UserExamAttemptsDetailController extends BaseListController {
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
  UserDetailController,
  UserListController,
  UserExamAttemptsDetailController,
};
