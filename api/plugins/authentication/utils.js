const parseAuthHeaders = (headers) =>
  headers.authorization ? headers.authorization.split(' ') : [null, null];

module.exports = {
  parseAuthHeaders,
};
