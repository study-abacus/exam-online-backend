const ApiError = require('base/error');

const matchPassword = async (request, reply) => {
  const { password, passwordRepeat } = request.body;

  if (password !== passwordRepeat) {
    throw new ApiError(
      {
        title: 'Password do not match',
      },
      400,
    );
  }
};

module.exports = matchPassword;
