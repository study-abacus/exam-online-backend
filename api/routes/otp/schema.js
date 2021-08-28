const postSchema = {
  body: {
    type: 'object',
    required: ['phone'],
    properties: {
      phone: {
        type: 'string',
      },
    },
  },
};

module.exports = {
  postSchema,
};
