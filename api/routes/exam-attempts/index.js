const LoginRequired = require('hooks/login-required');
const Controllers = require('./controllers');

module.exports = async (app, opts) => {
  app.get(
    '/',
    {
      preHandler: LoginRequired
    },
    Controllers.ExamAttemptListController.asHandler('get')
  )
  app.get(
    '/:id',
    {
      preHandler: LoginRequired
    },
    Controllers.ExamAttemptDetailController.asHandler('get')
  )
}

module.exports.autoPrefix = '/exam-attempts'
