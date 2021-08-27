const { Op } = require('sequelize');
const BaseController = require('base/controllers/baseController');
const BaseDetailController = require('base/controllers/detailController');
const BaseUpdateController = require('base/controllers/updateController');
const DB = require('models');
const config = require('config');
const ApiError = require('base/error');
const { createUserAfterSignUp } = require('./utils');

class UserDetailController extends BaseDetailController {
  model = DB.users;

  async getMe() {
    const user = await this.model.findByPk(this.request.user.id, {
      include: {
        model: DB.profiles,
      },
    });

    return this.serialize(user);
  }

  async post() {
    const { name, username, password, phone } = this.request.body;

    const previousUser = await this.model.findOne({
      where: {
        username: {
          [Op.iLike]: username,
        },
      },
    });

    if (previousUser) {
      throw new ApiError(
        {
          title: 'Username already exist',
        },
        400,
      );
    }

    const user = await createUserAfterSignUp({ name, username, password, phone });

    return this.serialize(user);
  }
}

class UserUpdateController extends BaseUpdateController {
  model = DB.users;
  nonEditableAttrs = ['email', 'verified'];

  getObject() {
    return this.model.findByPk(this.request.user.id);
  }
}

class UserVerifyController extends BaseController {
  async post() {
    const _emailService = this.app.getService('email');
    const _verifyService = this.app.getService('verification');

    const token = await _verifyService.createVerificationRequest(this.request.user);
    _emailService.sendViaTemplate(_emailService.templateMap.VERIFY_EMAIL, {
      subject: 'Study Abacus Email Verification',
      to: this.request.user.email,
      templateData: {
        link: config.SERVER.FRONTEND_URL + '/verify/' + token,
      },
    });

    this.response.status(204).send({});
  }

  async postToken() {
    const { token } = this.request.params;
    const _verifyService = this.app.getService('verification');

    await _verifyService.verifyUser(token);

    this.response.status(204).send({});
  }
}

module.exports = {
  UserDetailController,
  UserVerifyController,
  UserUpdateController,
};
