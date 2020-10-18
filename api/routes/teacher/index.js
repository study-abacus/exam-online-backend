const Controllers = require('./controllers')

module.exports = async (app, opts) => {
  app.get(
    '/',
    Controllers.TeacherListController.asHandler('get')
  )
}

module.exports.autoPrefix = '/teachers'
