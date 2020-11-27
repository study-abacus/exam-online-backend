const LoginRequired = require('hooks/login-required');
const hasExamAttempt = require('hooks/has-exam-attempt');
const Controllers = require('./controllers');
const Hooks = require('./hooks');

module.exports = async (app, opts) => {
  app.get(
    '/',
    {
      preHandler: LoginRequired,
    },
    Controllers.ExamAttemptListController.asHandler('get'),
  );
  app.get(
    '/:id',
    {
      preHandler: [LoginRequired, Hooks.examAttemptBelongsToUser],
    },
    Controllers.ExamAttemptDetailController.asHandler('get'),
  );
  app.post(
    '/:id/submit',
    {
      preHandler: [LoginRequired, Hooks.examAttemptBelongsToUser],
    },
    Controllers.ExamAttemptSubmitController.asHandler('post'),
  );
};

module.exports.autoPrefix = '/exam-attempts';
