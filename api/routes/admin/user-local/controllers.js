const BaseDetailController = require('base/controllers/detailController');
const BaseListController = require('base/controllers/listController');
const BaseCreateController = require('base/controllers/createController');
const BaseUpdateController = require('base/controllers/updateController');
const DB = require('models');
const UserLocalSerializerOpts = require('serializer-opts/admin/user-local');
const { pass2hash } = require('utils/password');

class UserLocalDetailController extends BaseDetailController {
  model = DB.userLocals;
  modelName = DB.userLocals.name;
  serializerOpts = UserLocalSerializerOpts(DB.userLocals);
}

class UserLocalListController extends BaseListController {
  model = DB.userLocals;
  modelName = DB.userLocals.name;
  serializerOpts = UserLocalSerializerOpts(DB.userLocals);
}

class UserLocalCreateController extends BaseCreateController {
  model = DB.userLocals;
  modelName = DB.userLocals.name;
  deserializerOpts = UserLocalSerializerOpts(DB.userLocals, 'deserialize');
  serializerOpts = UserLocalSerializerOpts(DB.userLocals);

  async beforeCreate(model) {
    const hash = await pass2hash(model.password);

    model.passwordHash = hash;
  }
}

class UserLocalUpdateController extends BaseUpdateController {
  model = DB.userLocals;
  modelName = DB.userLocals.name;
  deserializerOpts = UserLocalSerializerOpts(DB.userLocals, 'deserialize');
  serializerOpts = UserLocalSerializerOpts(DB.userLocals);

  async beforeCreate(model) {
    const hash = await pass2hash(model.password);

    model.passwordHash = hash;
  }
}

module.exports = {
  UserLocalDetailController,
  UserLocalListController,
  UserLocalCreateController,
  UserLocalUpdateController,
};
