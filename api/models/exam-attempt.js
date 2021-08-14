const { Model } = require('sequelize');
const JsonApiModel = require('base/jsonApiModel');
const SerializerOpts = require('serializer-opts/exam-attempts');

class ExamAttempt extends JsonApiModel {
  static get serializerOpts() {
    return SerializerOpts(this);
  }

  static associate({ examAttempts, examinations, users }) {
    examAttempts.belongsTo(examinations);
    examAttempts.belongsTo(users);
  }
}

module.exports = (sequelize, DataTypes) => {
  ExamAttempt.init(
    {
      start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isSubmitted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      submittedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      result: {
        type: DataTypes.JSON,
      },
      certificate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'examAttempts',
    },
  );
  return ExamAttempt;
};
