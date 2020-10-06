const DB = require('models');

module.exports = {
  JWT: async (app, token) => {
    const payload = app.decodeJwt(token)
    const user = await DB.users.findByPk(payload.user.id)

    return user
  }
}
