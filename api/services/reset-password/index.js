const Sequelize = require('sequelize');
const DB = require('models');
const { v4 } = require('uuid');
const ApiError = require('base/error');
const moment = require('moment');
const { pass2hash } = require('utils/password');

class ResetPasswordService {
  constructor(app) {
    this._app = app;
  }

  async createResetRequest(user) {
    const resetToken = v4();
    const request = await DB.resetRequests.create({
      resetToken,
      validTill: moment().add(10, 'minutes').toISOString(),
      userId: user.id,
    });

    return resetToken;
  }

  async verifyResetToken(resetToken) {
    const request = await DB.resetRequests.findOne({
      where: {
        resetToken,
        validTill: {
          [Sequelize.Op.gt]: moment().toISOString(),
        },
      },
    });

    if (!request) {
      throw new ApiError(
        {
          title: 'Invalid Token',
        },
        400,
      );
    }

    return request;
  }

  async updatePassword(userId, password) {
    const passwordHash = await pass2hash(password);

    await DB.userLocals.update(
      {
        passwordHash,
      },
      {
        where: {
          userId,
        },
      },
    );
  }

  async deleteResetRequest(resetToken, userId) {
    await DB.resetRequests.destroy({
      where: {
        resetToken,
        userId,
      },
    });
  }
}

module.exports = ResetPasswordService;
