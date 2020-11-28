const JsonApiModel = require('base/jsonApiModel');
const SerializerOpts = require('serializer-opts/choice');

class Choice extends JsonApiModel {
  static get serializerOpts() {
    return SerializerOpts(this);
  }

  static associate({ questions, choices }) {
    choices.belongsTo(questions, {
      scope: {
        type: 'mcq',
      },
    });
    questions.hasMany(choices);
  }
}

module.exports = (sequelize, DataTypes) => {
  Choice.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'choices',
    },
  );
  return Choice;
};
