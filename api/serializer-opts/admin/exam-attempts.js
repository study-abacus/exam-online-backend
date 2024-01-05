const ExaminationSerializerOpts = require('./examination');
const UserSerializerOpts = require('./user');

module.exports = (model, type = 'serialize') => {
  if (type == 'deserialize') {
    return {
      examinations: {
        valueForRelationship: (relationship) => ({ id: relationship.id }),
      },
      users: {
        valueForRelationship: (relationship) => ({ id: relationship.id }),
      },
    };
  }
  return {
    attributes: ['id', 'start', 'isSubmitted', 'submittedAt', 'result', 'examination', 'user'],
    examination: {
      ref: 'id',
      ...ExaminationSerializerOpts(),
    },
    user: {
      ref: 'id',
      ...UserSerializerOpts(),
    },
    meta: {
      pagination: (records) => records.pagination,
    },
  };
};
