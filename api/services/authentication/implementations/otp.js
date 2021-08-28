const { Op } = require('sequelize');
const DB = require('models');
const { v4 } = require('uuid');
const AuthStrategyInterface = require('../interface');

class OtpAuthStrategy extends AuthStrategyInterface {
  constructor(app) {
    super(app);
    this._redis = app.getService('redis').client;
  }

  async authenticate({ phone, otp }) {
    const correctOtp = await this._redis.get(phone);
    if (correctOtp == otp) {
      const user = await DB.users.findOne({
        where: { phone },
      });
      return {
        jwt: this._generateJwt({ user }),
        refresh_token: v4(),
      };
    }
    return null;
  }
}

module.exports = OtpAuthStrategy;
