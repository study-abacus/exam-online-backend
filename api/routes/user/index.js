const Controllers = require('./controllers');
const Schema = require('./schema');
const LoginRequired = require('hooks/login-required');
const MatchPassword = require('hooks/match-password');

module.exports = async (app, opts) => {
  app.get(
    '/me',
    {
      preHandler: LoginRequired,
    },
    Controllers.UserDetailController.asHandler('getMe'),
  );
  app.patch(
    '/me',
    {
      preHandler: LoginRequired,
    },
    Controllers.UserUpdateController.asHandler('patch'),
  );
  app.post(
    '/me/verify',
    {
      preHandler: LoginRequired,
    },
    Controllers.UserVerifyController.asHandler('post', app),
  );
  app.post('/verify/:token', Controllers.UserVerifyController.asHandler('postToken', app));
  app.get('/:id', Controllers.UserDetailController.asHandler('get'));
  app.post(
    '/',
    {
      schema: Schema.postSchema,
      preHandler: MatchPassword,
      validatorCompiler: ({ schema, method, url, httpPart }) => {
        return (data) => schema.validate(data);
      },
    },
    Controllers.UserDetailController.asHandler('post', app),
  );
};

module.exports.autoPrefix = '/users';
