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
    required: ['password'],
    properties: {
      password: {
        type: 'string',
      },
    },
  },
};

module.exports = {
  postSchema,
  postResetPasswordSchema,
};
