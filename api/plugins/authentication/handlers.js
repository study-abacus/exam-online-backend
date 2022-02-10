const DB = require('models');
const ApiError = require('base/error');
const ClientUser = require('base/clientUser');

module.exports = {
  JWT: async (app, token) => {
    try {
      const payload = app.decodeJwt(token);
      const user = await DB.users.findByPk(payload.user.id, {
        include: {
          model: DB.profiles,
        },
      });
      return user;
    } catch (err) {
      throw new ApiError(
        {
          title: 'JWT expired or Invalid',
        },
        401,
      );
    }
  },
  TOKEN: async (app, token) => {
    try {
      const payload = app.decodeJwt(token, (source = 'client'));

      return new ClientUser(payload.client.name);
    } catch (err) {
      throw new ApiError(
        {
          title: 'Token expired or Invalid',
        },
        401,
      );
    }
  },
};
