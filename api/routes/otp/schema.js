const postSchema = {
  body: {
    type: 'object',
    required: ['phone'],
  },
};

module.exports = {
  postSchema,
};
