const { Error } = require('jsonapi-serializer');

class ApiError extends Error {
  constructor({
    title,
    code,
    detail
  }, statusCode = 500) {
    super();
    this.title = title;
    this.code = code;
    this.detail = detail;
    this.statusCode = statusCode;
  }

  toJsonApiResponse() {
    return new Error({
      title: this.title,
      detail: this.detail,
      code: this.code
    })
  }
}

module.exports = ApiError;
