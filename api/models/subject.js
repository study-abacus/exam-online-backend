const { Model } = require('sequelize');

class Subject extends Model {
  static associate({ examinations, subjects }) {
    subjects.belongsTo(examinations);
    examinations.hasMany(subjects);
  }
}

module.exports = (sequelize, DataTypes) => {
  Subject.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(DataTypes.STRING),
        values: ['english', 'vedic-maths', 'abacus'],
        allowNull: false,
      },
      start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      enrollable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'subjects',
    },
  );
  return Subject;
};
