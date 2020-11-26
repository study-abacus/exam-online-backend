const { Model } = require('sequelize');
const JsonApiModel = require('base/jsonApiModel');
const SerializerOpts = require('serializer-opts/question-attempt');

class QuestionAttempt extends JsonApiModel {
  static get serializerOpts() {
    return SerializerOpts(this);
  }

  static get deserializerOpts() {
    return SerializerOpts(this, 'deserialize');
  }

  static associate({ questions, questionAttempts, examAttempts }) {
    questions.hasOne(questionAttempts);
    questionAttempts.belongsTo(questions);
    questionAttempts.belongsTo(examAttempts);
  }
}

module.exports = (sequelize, DataTypes) => {
  QuestionAttempt.init(
    {
      answer: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      willReview: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'questionAttempts',
    },
  );
  return QuestionAttempt;
};
