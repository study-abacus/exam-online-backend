const { Model } = require('sequelize');

class SubjectAttempt extends Model {
  static associate({ subjectAttempts, subjects, users }) {
    subjectAttempts.belongsTo(subjects);
    subjectAttempts.belongsTo(users);
  }
}

module.exports = (sequelize, DataTypes) => {
  SubjectAttempt.init(
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
    },
    {
      sequelize,
      modelName: 'subjectAttempts',
    },
  );
  return SubjectAttempt;
};
