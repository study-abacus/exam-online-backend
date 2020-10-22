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
      },
      passwordRepeat: {
        type: 'string',
      },
    },
  },
};

module.exports = {
  postSchema,
};
