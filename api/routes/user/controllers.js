const BaseController = require('base/controllers/baseController');
const BaseDetailController = require('base/controllers/detailController');
const DB = require('models');
const config = require('config');
const ApiError = require('base/error');
const { createUserAfterSignUp } = require('./utils');

class UserDetailController extends BaseDetailController {
  model = DB.users

  async getMe() {
    const user = this.request.user;

    return this.serialize(user);
  }

  async post() {
    const { name, email, password, passwordRepeat } = this.request.body;

    if (password !== passwordRepeat) {
      throw new ApiError({
        title: 'Password do not match'
      }, 400);
    }

    const previousUser = await this.model.findOne({
      where: {
        email
      }
    })

    if (previousUser) {
      throw new ApiError({
        title: 'Email ID already exist'
      }, 400);
    }

    const user = await createUserAfterSignUp({ name, email, password });

    return this.serialize(user);
  }
}

class UserVerifyController extends BaseController {
  async post() {
    const _emailService = this.app.getService('email');
    const _verifyService = this.app.getService('verification');

    const token = await _verifyService.createVerificationRequest(this.request.user);
    _emailService.sendViaTemplate(_emailService.templateMap.VERIFY_EMAIL, {
      to: this.request.user.email,
      templateData: {
        link: config.SERVER.FRONTEND_URL + token
      }
    })

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
  UserVerifyController
}
