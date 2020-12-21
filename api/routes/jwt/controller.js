const ApiError = require('base/error');

module.exports = {
  LOGIN: (app) => async (request, reply) => {
    const _authenticationService = app.getService('authentication');

    const { email, password } = request.body;
    const token = await _authenticationService.authenticate(email.trim(), password);

    if (!token) {
      throw new ApiError(
        {
          title: 'Incorrect Credentials',
        },
        401,
      );
    }

    return token;
  },
};
