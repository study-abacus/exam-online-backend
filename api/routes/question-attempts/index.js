const Controllers = require('./controllers');
const LoginRequired = require('hooks/login-required');
const HasExamAttempt = require('hooks/has-exam-attempt');
const DB = require('models');
const { getExamIdFromQuestionAttempt, deserializeAndExtractExamId } = require('./utils');

module.exports = async (app, opts) => {
  app.get(
    '/:id',
    {
      preHandler: [LoginRequired, HasExamAttempt(getExamIdFromQuestionAttempt)],
    },
    Controllers.QuestionAttemptDetailController.asHandler('get'),
  );
  app.post(
    '/',
    {
      preHandler: [LoginRequired, HasExamAttempt(deserializeAndExtractExamId)],
    },
    Controllers.QuestionAttemptCreateController.asHandler('post'),
  );
  app.patch(
    '/:id',
    {
      preHandler: [LoginRequired, HasExamAttempt(getExamIdFromQuestionAttempt)],
    },
    Controllers.QuestionAttemptUpdateController.asHandler('patch'),
  );
};

module.exports.autoPrefix = '/question-attempts';
