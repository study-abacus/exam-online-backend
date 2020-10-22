const { Model } = require('sequelize');
const JsonApiModel = require('base/jsonApiModel');
const SerializerOpts = require('serializer-opts/teacher');

class Teacher extends JsonApiModel {
  static get serializerOpts() {
    return SerializerOpts(this);
  }

  static associate() {}
}

module.exports = (sequelize, DataTypes) => {
  Teacher.init(
    {
      name: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'teachers',
    },
  );
  return Teacher;
};
