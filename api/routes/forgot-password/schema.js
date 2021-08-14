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
  postResetPasswordSchema,
};
