const {
  Model
} = require('sequelize');
const JsonApiModel = require('base/jsonApiModel');

class User extends JsonApiModel {
  attributes = ['id', 'name', 'email']

  static associate(models) {
    // define association here
  }
};

module.exports = (sequelize, DataTypes) => {
  User.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'users',
  });

  return User;
};
