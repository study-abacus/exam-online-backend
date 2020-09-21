const Controllers = require('./controllers');

module.exports = async (app, opts) => {
  app.get(
    '/:id',
    Controllers.UserDetailController.asHandler('get')
  )
}

module.exports.autoPrefix = '/users'
