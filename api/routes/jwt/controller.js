const ApiError = require('base/error');

module.exports = {
  LOGIN: (app) => async (request, reply) => {
    const _authenticationService = app.getService('authentication');

    const { username, password } = request.body;
    const strategy = await _authenticationService.getStrategy();
    const token = await strategy.authenticate({ username: username.trim(), password });

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
