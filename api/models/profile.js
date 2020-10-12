const {
  Model
} = require('sequelize');
const JsonApiModel = require('base/jsonApiModel');
const SerializerOpts = require('serializer-opts/profile');

const AVAILABLE_COURSES = ['Abacus', 'Vedic Maths', 'English'];

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
    guardianName: {
      type: DataTypes.STRING
    },
    contact: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.TEXT
    },
    city: {
      type: DataTypes.STRING
    },
    currentCourse: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        hasValidCourse: value => {
          if (!value) return value

          value.forEach(val => {
            if (!AVAILABLE_COURSES.includes(val)){
              throw new Error(`Unidentified course ${val}`);
            }
          })

          return value
        }
      }
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
