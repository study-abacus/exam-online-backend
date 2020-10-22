const BaseDetailController = require('base/controllers/detailController');
const BaseCreateController = require('base/controllers/createController');
const BaseUpdateController = require('base/controllers/updateController');
const DB = require('models');

class ProfileDetailController extends BaseDetailController {
  model = DB.profiles;

  generateWhereClause() {
    const whereClause = super.generateWhereClause();

    return {
      ...whereClause,
      userId: this.request.user.id,
    };
  }
}

class ProfileCreateController extends BaseCreateController {
  model = DB.profiles;

  beforeCreate(model) {
    model.userId = this.request.user.id;
  }
}

class ProfileUpdateController extends BaseUpdateController {
  model = DB.profiles;

  beforeUpdate(model) {
    model.userId = this.request.user.id;
  }
}

module.exports = {
  ProfileDetailController,
  ProfileCreateController,
  ProfileUpdateController,
};
