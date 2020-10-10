const {
  Model
} = require('sequelize');
const JsonApiModel = require('base/jsonApiModel');
const SerializerOpts = require('serializer-opts/profile');

class Profile extends JsonApiModel {
  static get serializerOpts() {
    return SerializerOpts(this);
  }

  static associate({ users, profiles }) {
    profiles.belongsTo(users);
    users.hasOne(profiles)
  }
};

module.exports = (sequelize, DataTypes) => {
  Profile.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    school: {
      type: DataTypes.STRING
    },
    class: {
      type: DataTypes.STRING,
    },
    currentLevel: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'profiles',
  });

  return Profile;
};
