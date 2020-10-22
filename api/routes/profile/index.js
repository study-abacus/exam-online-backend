const LoginRequired = require('hooks/login-required');

const Controllers = require('./controllers');

module.exports = async (app, opts) => {
  app.post(
    '/',
    {
      preHandler: LoginRequired,
    },
    Controllers.ProfileCreateController.asHandler('post'),
  );
  app.patch(
    '/:id',
    {
      preHandler: LoginRequired,
    },
    Controllers.ProfileUpdateController.asHandler('patch'),
  );
  app.get(
    '/:id',
    {
      preHandler: LoginRequired,
    },
    Controllers.ProfileDetailController.asHandler('get'),
  );
};

module.exports.autoPrefix = '/profiles';
