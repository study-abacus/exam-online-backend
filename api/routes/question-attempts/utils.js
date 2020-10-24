const DB = require('models');
const { Deserializer } = require('jsonapi-serializer');

const getExamAttemptId = async (questionId, userId) => {
  const examId = await getExamIdFromQuestionId(questionId);

  const examAttempt =  await DB.examAttempts.findOne({
    where: {
      userId: userId,
      examinationId: examId,
    } 
  });

  return examAttempt.id;
};

const getExamIdFromQuestionId = async (questionId) => {
  const question = await DB.questions.findByPk(questionId);

  return question.examinationId;
};

const getExamIdFromQuestionAttempt = async (request) => {
  const questionAttempt = await DB.questionAttempts.findByPk(request.params.id);

  return getExamIdFromQuestionId(questionAttempt.questionId);
};

const deserializeAndExtractExamId = async (request) => {
  const deserializer = new Deserializer({
    questions: {
      valueForRelationship: relationship => ({ id: relationship.id }),
    },
  });
  const questionAttemptData = await deserializer.deserialize(request.body);

  return getExamIdFromQuestionId(questionAttemptData.question.id);
};

module.exports = {
  getExamAttemptId,
  getExamIdFromQuestionId,
  getExamIdFromQuestionAttempt,
  deserializeAndExtractExamId,
};