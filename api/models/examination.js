const { Model } = require('sequelize');
const JsonApiModel = require('base/jsonApiModel');
const SerializerOpts = require('serializer-opts/examination');

class Examination extends JsonApiModel {
  static get serializerOpts() {
    return SerializerOpts(this);
  }

  static associate(models) {
    // define association here
  }
}

module.exports = (sequelize, DataTypes) => {
  Examination.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(DataTypes.STRING),
        values: ['english', 'vedic-maths', 'abacus'],
        allowNull: false,
      },
      primaryPrice: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      secondaryPrice: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      registrationEnd: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      unlisted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'examinations',
    },
  );
  return Examination;
};
