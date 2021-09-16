const { Op } = require('sequelize');
const DB = require('models');
const { v4 } = require('uuid');
const { compare2hash, pass2hash } = require('utils/password');
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

  _generateJwt(user) {
    return this._app.encodeJwt({
      ...user,
    });
  }

  async createUser(credentials) {
    const passwordHash = await pass2hash(credentials.password);
    const previousUser = await this.model.findOne({
      where: {
        username: {
          [Op.iLike]: credentials.username,
        },
      },
    });

    if (previousUser) {
      throw new ApiError(
        {
          title: 'Username already exists',
        },
        400,
      );
    }

    const userLocal = await DB.userLocals.create(
      {
        passwordHash,
        username,
        user: {
          name,
          phone,
        },
      },
      {
        include: [DB.users],
      },
    );

    return DB.users.findByPk(userLocal.user.id);
  }
}

module.exports = UsernamePasswordAuthStrategy;
