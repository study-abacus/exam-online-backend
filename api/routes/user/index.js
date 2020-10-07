const Controllers = require('./controllers');
const Schema = require('./schema');
const LoginRequired = require('hooks/login-required');

module.exports = async (app, opts) => {
  app.get(
    '/me',
    {
      preHandler: LoginRequired
    },
    Controllers.UserDetailController.asHandler('getMe')
  )
  app.get(
    '/:id',
    Controllers.UserDetailController.asHandler('get')
  )
  app.post(
    '/',
    {
      schema: Schema.postSchema
    },
    Controllers.UserDetailController.asHandler('post')
  )
}

module.exports.autoPrefix = '/users'
