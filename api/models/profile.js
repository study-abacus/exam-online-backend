const { Model } = require('sequelize');
const JsonApiModel = require('base/jsonApiModel');
const SerializerOpts = require('serializer-opts/profile');

const AVAILABLE_COURSES = ['Abacus', 'Vedic Maths', 'English'];

class Profile extends JsonApiModel {
  static get serializerOpts() {
    return SerializerOpts(this);
  }

  static get deserializerOpts() {
    return SerializerOpts(this, 'deserialize');
  }

  static associate({ users, profiles, teachers }) {
    profiles.belongsTo(users);
    profiles.belongsTo(teachers);
    users.hasOne(profiles);
    teachers.hasMany(profiles);
  }
}

module.exports = (sequelize, DataTypes) => {
  Profile.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      school: {
        type: DataTypes.STRING,
      },
      class: {
        type: DataTypes.STRING,
      },
      guardianName: {
        type: DataTypes.STRING,
      },
      otherTeacher: {
        type: DataTypes.STRING,
      },
      contact: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.TEXT,
      },
      city: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
        defaultValue: 'India',
      },
      currentCourse: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        validate: {
          hasValidCourse: (value) => {
            if (!value) return value;

            value.forEach((val) => {
              if (!AVAILABLE_COURSES.includes(val)) {
                throw new Error(`Unidentified course ${val}`);
              }
            });

            return value;
          },
        },
      },
      currentLevel: {
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'profiles',
    },
  );

  return Profile;
};
