const DB = require('models');

const getExamAttemptId = async (questionId, userId) => {
  const question =  await DB.questions.findByPk(questionId);

  const examAttempt =  await DB.examAttempts.findOne({
    where: {
      userId: userId,
      examinationId: question.examinationId,
    } 
  });

  return examAttempt.id;
};

module.exports = {
  getExamAttemptId,
};