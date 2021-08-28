const loginSchema = {
  body: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      phone: { type: 'string' },
      otp: { type: 'string' },
    },
  },
};

module.exports = {
  loginSchema,
};
