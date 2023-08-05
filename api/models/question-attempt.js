const { Model } = require('sequelize');

class QuestionAttempt extends Model {
  static associate({ questions, questionAttempts, subjectAttempts }) {
    questions.hasOne(questionAttempts);
    questionAttempts.belongsTo(questions);
    questionAttempts.belongsTo(subjectAttempts);
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
