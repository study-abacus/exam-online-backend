const Controllers = require('./controllers');
const LoginRequired = require('hooks/login-required');
const HasExamAttempt = require('hooks/has-exam-attempt');

module.exports = async (app, opts) => {
  app.get('/', Controllers.ExaminationListController.asHandler('get'));
  app.get(
    '/:id/relationships/practice-papers',
    {
      preHandler: LoginRequired,
    },
    Controllers.RelationshipPracticePaperController.asHandler('get'),
  );
  app.get(
    '/:id/relationships/questions',
    {
      preHandler: [LoginRequired, HasExamAttempt()],
    },
    Controllers.RelationshipQuestionController.asHandler('get'),
  );
  app.get(
    '/:id',
    {
      preHandler: [LoginRequired, HasExamAttempt({ enforceStart: false })],
    },
    Controllers.ExaminationDetailController.asHandler('get'),
  );
  app.get(
    '/:id/current-exam-attempt',
    {
      preHandler: [LoginRequired, HasExamAttempt({ enforceStart: false })],
    },
    Controllers.CurrentExamAttemptController.asHandler('get'),
  );
};

module.exports.autoPrefix = '/examinations';
