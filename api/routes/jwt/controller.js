const ApiError = require('base/error');

module.exports = {
  LOGIN: (app) => async (request, reply) => {
    const _authenticationService = app.getService('authentication');
    const { name } = request.body;
    const strategy = await _authenticationService.getStrategy(name);
    const token = await strategy.authenticate(request.body);

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
