const { Op } = require('sequelize');
const DB = require('models');
const { v4 } = require('uuid');
const AuthStrategyInterface = require('../interface');
const ApiError = require('base/error');

class OtpAuthStrategy extends AuthStrategyInterface {
  constructor(app) {
    super(app);
    this._redis = app.getService('redis');
  }

  async matchOtp({ phone, otp }) {
    if (!phone || !otp) {
      return null;
    }
    const correctOtp = (await this._redis.get(phone)) + '';
    if (correctOtp.trim().toLowerCase() === otp.toString().trim().toLowerCase()) {
      const user = await DB.users.findOne({
        where: { phone },
      });
      return user;
    }
    return null;
  }

  async authenticate({ phone, otp }) {
    const user = await this.matchOtp({ phone, otp });
    if (user) {
      return {
        jwt: this._generateJwt({ user }),
        refresh_token: v4(),
      };
    }
    return null;
  }

  _generateJwt(user) {
    return this._app.encodeJwt({
      ...user,
    });
  }

  async createUser(credentials) {
    const previousUser = await this.matchOtp(credentials);

    if (previousUser) {
      throw new ApiError(
        {
          title: 'Phone number already in use',
        },
        400,
      );
    }

    const newUser = await DB.profiles.create(
      {
        ...credentials,
        user: {
          ...credentials,
        },
      },
      {
        include: [DB.users],
      },
    );

    return DB.users.findByPk(newUser.user.id);
  }
}

module.exports = OtpAuthStrategy;
