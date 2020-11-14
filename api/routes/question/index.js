const LoginRequired = require('hooks/login-required');
const HasExamAttempt = require('hooks/has-exam-attempt');
const DB = require('models');
const Controllers = require('./controllers');

const getExamIdFromQuestion = async (request) => {
  const question = await DB.questions.findByPk(request.params.id);
  return question.examinationId;
};

module.exports = async (app, opts) => {
  app.get(
    '/:id',
    {
      preHandler: [LoginRequired, HasExamAttempt(getExamIdFromQuestion)],
    },
    Controllers.QuestionDetailController.asHandler('get'),
  );
};

module.exports.autoPrefix = '/questions';
