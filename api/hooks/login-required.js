const ApiError = require('base/error');

const loginRequired = async (request, reply) => {
  if (!request.user) {
    throw new ApiError(
      {
        title: 'Login Required',
      },
      401,
    );
  }
};

module.exports = loginRequired;
