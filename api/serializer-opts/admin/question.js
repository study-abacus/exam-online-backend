const ChoiceSerializerOpts = require('./choice');

module.exports = (model, type = 'serialize') => {
  if (type == 'deserialize') {
    return {
      examinations: {
        valueForRelationship: (relationship) => ({ id: relationship.id }),
      },
    };
  }

  return {
    attributes: ['id', 'title', 'description', 'type', 'choices'],
    choices: {
      ref: 'id',
      ...ChoiceSerializerOpts(),
    },
    meta: {
      pagination: (records) => records.pagination,
    },
  };
};
