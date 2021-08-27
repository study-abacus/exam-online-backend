class AuthStrategyInterface {
  async authenticate(credentials) {
    throw new Error('Not Implemented');
  }

  constructor(app) {
    this._app = app;
  }

  _generateJwt(user) {
    return this._app.encodeJwt({
      user,
    });
  }
}

module.exports = AuthStrategyInterface;
