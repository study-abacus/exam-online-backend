const BaseDetailController = require('base/controllers/detailController');
const DB = require('models');
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

module.exports = {
  UserDetailController
}
