const resultSchema = {
  body: {
    type: 'object',
    required: ['phone_number', 'roll_number'],
    properties: {
      phone_number: {
        type: 'string',
      },
      roll_number: {
        type: 'number',
        maximum: 4000,
      },
    },
  },
};

module.exports = {
  resultSchema,
};
