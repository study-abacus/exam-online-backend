module.exports = (model, type = 'serialize') => {
  if (type === 'deserialize') {
    return {
      questions: {
        valueForRelationship: (relationship) => ({ id: relationship.id }),
      },
    };
  }

  return {
    attributes: ['id', 'title'],
    meta: {
      pagination: (records) => records.pagination,
    },
  };
};
