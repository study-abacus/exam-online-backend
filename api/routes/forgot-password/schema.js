const postSchema = {
  body: {
    type: 'object',
    required: ['email'],
    properties: {
      email: {
        type: 'string',
      },
    },
  },
};

const postResetPasswordSchema = {
  body: {
    type: 'object',
    required: ['password', 'passwordRepeat'],
    properties: {
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
  postResetPasswordSchema,
};
