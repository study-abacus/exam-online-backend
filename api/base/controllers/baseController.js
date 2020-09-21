class BaseController {
  constructor(
    request,
    response
  ) {
    this.request = request;
    this.response = response;
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

  static asHandler(method) {
    return (request, response) => {
      const controller = new this(request, response)
      return controller[method]()
    }
  }
}

module.exports = BaseController;
