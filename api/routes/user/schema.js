const postSchema = {
  body: {
    type: 'object',
    required: ['name', 'email', 'password', 'passwordRepeat'],
    properties: {
      name: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
        minLength: 1,
      },
      passwordRepeat: {
        type: 'string',
        minLength: 1,
      },
    },
  },
};

module.exports = {
  postSchema,
};
