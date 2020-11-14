const Sequelize = require('sequelize');
const ApiError = require('base/error');
const DB = require('models');
const Moment = require('moment');

const hasExamAttempt = (opts = {}) => async (request, reply) => {
  const { examIdExtractor = async (request) => request.params.id, enforceStart = true } = opts;

  const examinationId = await examIdExtractor(request);
  const userId = request.user.id;

  const examAttempt = await DB.examAttempts.findOne({
    where: {
      examinationId,
      userId,
      ...(enforceStart && {
        start: {
          [Sequelize.Op.lt]: Moment(),
        },
      }),
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

module.exports = hasExamAttempt;
