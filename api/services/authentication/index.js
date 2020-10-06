const DB = require('models');
const { compare2hash } = require('utils/password')

class AuthenticationService {
  constructor(app) {
    this._app = app;
  }

  _generateJwt(user) {
    return this._app.encodeJwt({
      user
    });
  }

  async authenticate(email, password) {
    const userLocal = await DB.userLocals.findOne({
      include: {
        model: DB.users,
        where: {
          email
        },
        required: true
      }
    })

    if (await compare2hash(password, userLocal.passwordHash)) {
      return {
        jwt: this._generateJwt(userLocal.user)
      }
    }

    return null
  }
}

module.exports = AuthenticationService
