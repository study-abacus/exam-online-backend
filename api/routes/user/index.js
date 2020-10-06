const Controllers = require('./controllers');
const Schema = require('./schema');

module.exports = async (app, opts) => {
  app.get(
    '/:id',
    Controllers.UserDetailController.asHandler('get')
  )
  app.post(
    '/',
    Schema.postSchema,
    Controllers.UserDetailController.asHandler('post')
  )
}

module.exports.autoPrefix = '/users'
