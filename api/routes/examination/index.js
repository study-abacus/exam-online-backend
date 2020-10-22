const Controllers = require('./controllers');
const LoginRequired = require('hooks/login-required');
const HasExamAttempt = require('hooks/has-exam-attempt');

module.exports = async (app, opts) => {
  app.get('/', Controllers.ExaminationListController.asHandler('get'));
  app.get(
    '/:id/relationships/questions',
    {
      preHandler: [LoginRequired, HasExamAttempt()],
    },
    Controllers.RelationshipQuestionController.asHandler('get'),
  );
};

module.exports.autoPrefix = '/examinations';
