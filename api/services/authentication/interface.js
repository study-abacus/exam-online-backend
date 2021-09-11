class AuthStrategyInterface {
  async authenticate(credentials) {
    throw new Error('Not Implemented');
  }

  constructor(app) {
    this._app = app;
  }

  _generateJwt(user) {
    throw new Error('Not Implemented');
  }

  async createUser(credentials) {
    throw new Error('Not Implemented');
  }
}

module.exports = AuthStrategyInterface;
