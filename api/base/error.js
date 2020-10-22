class ApiError extends Error {
  __isApiError = true;

  constructor({ title, code, detail }, statusCode = 500) {
    super();
    this.title = title;
    this.code = code;
    this.detail = detail;
    this.statusCode = statusCode;
  }
}

module.exports = ApiError;
