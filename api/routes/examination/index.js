const Controllers = require('./controllers')
const LoginRequired = require('hooks/login-required');

module.exports = async (app, opts) => {
  app.get(
    '/',
    Controllers.ExaminationListController.asHandler('get')
  )
  app.get(
    '/:id/relationships/questions',
    {
      preHandler: LoginRequired
    },
    Controllers.RelationshipQuestionController.asHandler('get')
  )
}

module.exports.autoPrefix = '/examinations'
