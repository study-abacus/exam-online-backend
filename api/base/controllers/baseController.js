class BaseController {
  constructor(
    request,
    response,
    app
  ) {
    this.request = request;
    this.response = response;
    this.app = app;
  }

  async get() {
    throw new Error('Not Implemented');
  }
  async post() {
    throw new Error('Not Implemented');
  }
  async patch() {
    throw new Error('Not Implemented');
  }
  async delete() {
    throw new Error('Not Implemented');
  }

  static asHandler(method, app) {
    return (request, response) => {
      const controller = new this(request, response, app)
      return controller[method]()
    }
  }
}

module.exports = BaseController;
