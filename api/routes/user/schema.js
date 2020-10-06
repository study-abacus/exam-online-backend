const postSchema = {
  type: 'object',
  required: [
    'name',
    'email',
    'password'
  ],
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  }
}

module.exports = {
  postSchema
}
