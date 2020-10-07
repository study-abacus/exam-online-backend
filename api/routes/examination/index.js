const Controllers = require('./controllers')

module.exports = async (app, opts) => {
  app.get(
    '/',
    Controllers.ExaminationListController.asHandler('get')
  )
}

module.exports.autoPrefix = '/examinations'
