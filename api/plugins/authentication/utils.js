const parseAuthHeaders = headers => headers.authorization && headers.authorization.split(' ')

module.exports = {
  parseAuthHeaders
}
