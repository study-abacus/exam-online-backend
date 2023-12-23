module.exports = (model, type = 'serialize') => {
  if (type === 'deserialize') {
    return {
      users: {
        valueForRelationship: (relationship) => ({ id: relationship.id }),
      },
    };
  }

  return {
    attributes: ['id', 'username'],
  };
};
