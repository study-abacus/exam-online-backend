const Sequelize = require('sequelize');
const DB = require('models');
const { v4 } = require('uuid');
const ApiError = require('base/error');
const moment = require('moment');

class VerificationService {
  constructor(app) {
    this._app = app;
  }

  async createVerificationRequest(user) {
    if (user.verified) {
      throw new ApiError({
        title: 'User already verified'
      }, 400);
    }

    const token = v4();
    const request = await DB.verifyRequests.create({
      token,
      validTill: moment().add(10, 'minutes').toISOString(),
      userId: user.id
    });

    return token
  }

  async verifyUser(token) {
    const request = await DB.verifyRequests.findOne({
      where: {
        token,
        validTill: {
          [Sequelize.Op.gt]: moment().toISOString()
        }
      }
    })

    if (!request) {
      throw new ApiError({
        title: 'Invalid Token'
      }, 400)
    }

    await DB.users.update({
      verified: true
    }, {
      where: {
        id: request.userId
      }
    })
  }
}

module.exports = VerificationService;
