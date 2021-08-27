const { Op } = require('sequelize');
const DB = require('models');
const { v4 } = require('uuid');
const { compare2hash } = require('utils/password');
const AuthStrategyInterface = require('../interface');

class UsernamePasswordAuthStrategy extends AuthStrategyInterface {
  async authenticate({ username, password }) {
    const userLocal = await DB.userLocals.findOne({
      include: {
        attributes: ['id', 'name', 'username'],
        model: DB.users,
        where: {
          username: {
            [Op.iLike]: username,
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

module.exports = UsernamePasswordAuthStrategy;
