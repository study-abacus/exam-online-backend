const Controllers = require('./controllers');
const LoginRequired = require('hooks/login-required');
const HasExamAttempt = require('hooks/has-exam-attempt');
const { Deserializer } = require('jsonapi-serializer');
const DB = require('models');

const qustionAttemptExamId = async (request) => {
  const deserializer = new Deserializer({
    questions: {
      valueForRelationship: relationship => ({ id: relationship.id }),
    },
  });
  const questionAttemptData = await deserializer.deserialize(request.body);
  const question =  await DB.questions.findByPk(questionAttemptData.question.id);

  return question.examinationId;
};

module.exports = async (app, opts) => {
  app.post(
    '/',
    {
      preHandler: [
        LoginRequired,
        HasExamAttempt(qustionAttemptExamId),
      ]
    },
    Controllers.QuestionAttemptCreateController.asHandler('post'),
  )
};

module.exports.autoPrefix = '/question-attempts';
