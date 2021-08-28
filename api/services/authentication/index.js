const UsernamePasswordAuthStrategy = require('./implementations/password');
const OtpAuthStrategy = require('./implementations/otp');

class AuthStrategyFactory {
  _DEFAULT_SERVICE = UsernamePasswordAuthStrategy;
  _SERVICE_MAP = {
    email: UsernamePasswordAuthStrategy,
    otp: OtpAuthStrategy,
  };

  constructor(app) {
    this._app = app;
  }

  async getStrategy(name = null) {
    const strategy = this._SERVICE_MAP[name] || this._DEFAULT_SERVICE;
    return new strategy(this._app);
  }
}

module.exports = AuthStrategyFactory;
