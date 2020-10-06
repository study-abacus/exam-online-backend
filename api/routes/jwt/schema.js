const loginSchema = {
  type: 'object',
  required: [
    'email',
    'password'
  ],
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  }
}

module.exports = {
  loginSchema
}
