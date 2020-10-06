const ApiError = require('base/error');

module.exports = {
  LOGIN: app => async (request, reply) => {
    const _authenticationService = app.getService('authentication')

    const { email, password } = request.body
    const token = await _authenticationService.authenticate(email, password);

    if (token) {
      return token
    }
    
    throw new ApiError({
      title: 'Incorrect Credentials'
    }, 401)
  }
}