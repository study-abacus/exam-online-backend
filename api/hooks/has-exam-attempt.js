const ApiError = require('base/error');
const DB = require('models');

const hasExamAttempt = (examIdExtractor = async (request) => request.params.id) => async (request, reply) => {
  const examinationId = await examIdExtractor(request);
  const userId = request.user.id;

  const examAttempt = await DB.examAttempts.findOne({
    where: {
      examinationId,
      userId
    }
  });

  if (!examAttempt) {
    throw new ApiError({
      title: 'Examination Attempt does not exist'
    }, 403);
  }
};

module.exports = hasExamAttempt;
