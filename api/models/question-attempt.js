const {
  Model
} = require('sequelize');
const JsonApiModel = require('base/jsonApiModel');
const SerializerOpts = require('serializer-opts/question-attempt');

class QuestionAttempt extends JsonApiModel {
  static get serializerOpts() {
    return SerializerOpts(this);
  }

  static associate({ examAttempts, questions, questionAttempts }) {
    questionAttempts.belongsTo(examAttempts);
    examAttempts.hasMany(questionAttempts);
    questionAttempts.belongsTo(questions);
    questions.hasMany(questionAttempts);
  }
};

module.exports = (sequelize, DataTypes) => {
  QuestionAttempt.init({
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'questionAttempts',
  });
  return QuestionAttempt;
};