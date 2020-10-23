const Controllers = require('./controllers');
const LoginRequired = require('hooks/login-required');
const HasExamAttempt = require('hooks/has-exam-attempt');
const { Deserializer } = require('jsonapi-serializer');
const DB = require('models');

const getExamIdFromQuestionId = async (questionId) => {
  const question = await DB.questions.findByPk(questionId);

  return question.examinationId;
};

const getExamIdFromQuestionAttempt = async (request) => {
  const questionAttempt = await DB.questionAttempts.findByPk(request.params.id);

  return getExamIdFromQuestionId(questionAttempt.questionId);
};

const examIdExtractor = async (request) => {
  const deserializer = new Deserializer({
    questions: {
      valueForRelationship: relationship => ({ id: relationship.id }),
    },
  });
  const questionAttemptData = await deserializer.deserialize(request.body);

  return getExamIdFromQuestionId(questionAttemptData.question.id);
};

module.exports = async (app, opts) => {
  app.get(
    '/:id',
    {
      preHandler: [
        LoginRequired,
        HasExamAttempt(getExamIdFromQuestionAttempt),
      ]
    },
    Controllers.QuestionAttemptDetailController.asHandler('get'),
  )
  app.post(
    '/',
    {
      preHandler: [
        LoginRequired,
        HasExamAttempt(examIdExtractor),
      ]
    },
    Controllers.QuestionAttemptCreateController.asHandler('post'),
  )
  app.patch(
    '/:id',
    {
      preHandler: [
        LoginRequired,
        HasExamAttempt(getExamIdFromQuestionAttempt),
      ]
    },
    Controllers.QuestionAttemptUpdateController.asHandler('patch'),
  )
};

module.exports.autoPrefix = '/question-attempts';
