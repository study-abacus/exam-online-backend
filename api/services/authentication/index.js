const { Op } = require('sequelize');
const DB = require('models');
const { v4 } = require('uuid');
const { compare2hash } = require('utils/password');

class AuthenticationService {
  constructor(app) {
    this._app = app;
  }

  _generateJwt(user) {
    return this._app.encodeJwt({
      user,
    });
  }

  async authenticate(email, password) {
    const userLocal = await DB.userLocals.findOne({
      include: {
        attributes: ['id', 'name', 'email'],
        model: DB.users,
        where: {
          email: {
            [Op.iLike]: email
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
