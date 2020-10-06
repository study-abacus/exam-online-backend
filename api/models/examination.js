const {
  Model
} = require('sequelize');
const JsonApiModel = require('base/jsonApiModel');

class Examination extends JsonApiModel {
  serializerOpts = {
    attributes: ['id', 'title', 'description', 'primaryPrice', 'secondaryPrice']
  }
  static associate(models) {
    // define association here
  }
};

module.exports = (sequelize, DataTypes) => {
  Examination.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: false
    },
    primaryPrice: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    secondaryPrice: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'examinations',
  });
  return Examination;
};