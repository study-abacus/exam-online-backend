const LoginRequired = require('hooks/login-required');
const HasExamAttempt = require('hooks/has-exam-attempt');
const DB = require('models');
const Controllers = require('./controllers');

module.exports = async (app, opts) => {
  app.get(
    '/:id',
    {
      preHandler: [
        LoginRequired,
        HasExamAttempt(async (request) => {
          const quiz = await DB.questions.findByPk(request.params.id);

          return quiz.examinationId;
        })
      ]
    },
    Controllers.QuestionDetailController.asHandler('get'),
  );
};

module.exports.autoPrefix = '/questions';
