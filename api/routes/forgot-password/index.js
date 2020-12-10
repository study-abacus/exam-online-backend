const Controllers = require('./controllers');
const Schema = require('./schema');
const MatchPassword = require('hooks/match-password');

module.exports = async (app, opts) => {
  app.post(
    '/',
    {
      schema: Schema.postSchema,
    },
    Controllers.ForgetPasswordController.asHandler('post', app),
  );
  app.post(
    '/verify-reset-token/:token',
    Controllers.ForgetPasswordController.asHandler('postVerifyToken', app),
  );
  app.post(
    '/reset-password/:token',
    {
      schema: Schema.postResetPasswordSchema,
      preHandler: MatchPassword,
    },
    Controllers.ForgetPasswordController.asHandler('postResetPassword', app),
  );
};

module.exports.autoPrefix = '/forget-password';
