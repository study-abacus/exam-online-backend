const {
  Model
} = require('sequelize');
const JsonApiModel = require('base/jsonApiModel');

class ExamAttempt extends JsonApiModel {
  //static attributes = ['id', 'title', 'description', 'primaryPrice', 'secondaryPrice', 'start', 'registrationEnd']

  static associate({ examAttempts, examinations, users }) {
    examAttempts.belongsTo(examinations);
    examAttempts.belongsTo(users);
  }
};

module.exports = (sequelize, DataTypes) => {
  ExamAttempt.init({
    start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isSubmitted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    result: {
      type: DataTypes.JSON
    }
  }, {
    sequelize,
    modelName: 'examAttempts',
  });
  return ExamAttempt;
};