const BaseDetailController = require('base/controllers/detailController');
const BaseController = require('base/controllers/baseController');
const DB = require('models');
const ApiError = require('base/error');
const { createUserAfterSignUp } = require('./utils');

class UserDetailController extends BaseDetailController {
  model = DB.users

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
