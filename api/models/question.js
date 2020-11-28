const { Model } = require('sequelize');
const JsonApiModel = require('base/jsonApiModel');
const SerializerOpts = require('serializer-opts/question');

class Question extends JsonApiModel {
  static get serializerOpts() {
    return SerializerOpts(this);
  }

  static associate({ examinations, questions }) {
    questions.belongsTo(examinations);
    examinations.hasMany(questions);
  }
}

module.exports = (sequelize, DataTypes) => {
  Question.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('number', 'text', 'paragraph', 'mcq'),
        defaultValue: 'number',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'questions',
    },
  );
  return Question;
};
