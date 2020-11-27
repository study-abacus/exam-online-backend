const DB = require('models');
const ApiError = require('base/error');

const examAttemptBelongsToUser = async (request) => {
  const examAttempt = await DB.examAttempts.findOne({
    where: {
      id: request.params.id,
      userId: request.user.id,
    },
  });

  if (!examAttempt) {
    throw new ApiError(
      {
        title: 'Examination Attempt does not exist',
      },
      403,
    );
  }
};

module.exports = {
  examAttemptBelongsToUser,
};
