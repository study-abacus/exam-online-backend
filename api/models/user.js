const {
  Model
} = require('sequelize');
const { Serializer } = require('jsonapi-serializer');

class User extends Model {
  serializerOpts = {
    attributes: ['id']
  }

  toJsonApiPayload() {
    const serializer = new Serializer(this.constructor.name, this.serializerOpts)
    return serializer.serialize(this)
  }

  static associate(models) {
    // define association here
  }
};

module.exports = (sequelize, DataTypes) => {
  User.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'users',
  });

  return User;
};
