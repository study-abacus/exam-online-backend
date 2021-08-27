const { Op } = require('sequelize');
const DB = require('models');
const { v4 } = require('uuid');
const { compare2hash } = require('utils/password');
const AuthStrategyInterface = require('../interface');

class EmailPasswordAuthStrategy extends AuthStrategyInterface {
  async authenticate({ phone, otp }) {
    return {};
    const userLocal = await DB.userLocals.findOne({
      include: {
        attributes: ['id', 'name', 'email'],
        model: DB.users,
        where: {
          email: {
            [Op.iLike]: email,
          },
        },
        required: true,
      },
    });

    if (userLocal && (await compare2hash(password, userLocal.passwordHash))) {
      return {
        jwt: this._generateJwt(userLocal.user),
        refresh_token: v4(),
      };
    }

    return null;
  }
}

module.exports = AuthenticationService;
