const postSchema = {
  body: {
    type: 'object',
    required: ['name', 'password', 'passwordRepeat'],
    properties: {
      name: {
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
