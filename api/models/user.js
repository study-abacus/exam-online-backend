const { Model } = require('sequelize');
const JsonApiModel = require('base/jsonApiModel');
const SerializerOpts = require('serializer-opts/user');
const { ROLES_TYPES } = require('../constants/roles');

class User extends JsonApiModel {
  static get serializerOpts() {
    return SerializerOpts(this);
  }

  static associate(models) {
    // define association here
  }
}

module.exports = (sequelize, DataTypes) => {
  User.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: { type: DataTypes.STRING, unique: true, allowNull: false },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      roles: {
        type: DataTypes.ARRAY(DataTypes.ENUM(ROLES_TYPES)),
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          validatePhone: function (value) {
            if (value.match(/\d/g).length !== 10) {
              throw new Error('Invalid phone number: ' + value);
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'users',
    },
  );

  return User;
};
