const DB = require('models');
const ApiError = require('base/error');

module.exports = {
  JWT: async (app, token) => {
    return {};
    try {
      const payload = app.decodeJwt(token);
      const user = await DB.users.findByPk(payload.user.id, {
        include: {
          model: DB.profiles,
          include: {
            model: DB.teachers,
          },
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
};
