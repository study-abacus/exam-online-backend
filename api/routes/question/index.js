const LoginRequired = require('hooks/login-required');
const HasExamAttempt = require('hooks/has-exam-attempt');
const ApiError = require('base/error');
const DB = require('models');
const Controllers = require('./controllers');

const getExamIdFromQuestion = async (request) => {
  const question = await DB.questions.findByPk(request.params.id);
  if (!question) {
    throw new ApiError(
      {
        title: 'Question not found',
      },
      404,
    );
  }
  return question.examinationId;
};

module.exports = async (app, opts) => {
  app.get(
    '/:id',
    {
      preHandler: [LoginRequired, HasExamAttempt({ examIdExtractor: getExamIdFromQuestion })],
    },
    Controllers.QuestionDetailController.asHandler('get'),
  );

  app.get(
    '/:id/current-question-attempt',
    {
      preHandler: [LoginRequired, HasExamAttempt({ examIdExtractor: getExamIdFromQuestion })],
    },
    Controllers.CurrentQuestionAttemptController.asHandler('get'),
  );
};

module.exports.autoPrefix = '/questions';
