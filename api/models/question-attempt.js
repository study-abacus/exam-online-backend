const { Model } = require('sequelize');
const JsonApiModel = require('base/jsonApiModel');
const SerializerOpts = require('serializer-opts/question-attempt');

class QuestionAttempt extends JsonApiModel {
  static get serializerOpts() {
    return SerializerOpts(this);
  }

  static associate({ questions, questionAttempts }) {
    questionAttempts.belongsTo(questions);
  }
}

module.exports = (sequelize, DataTypes) => {
  QuestionAttempt.init(
    {
      answer: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'questionAttempts',
    },
  );
  return QuestionAttempt;
};
