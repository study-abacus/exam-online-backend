const JsonApiModel = require('base/jsonApiModel');
const SerializerOpts = require('serializer-opts/practice-papers');

class PracticePaper extends JsonApiModel {
  static get serializerOpts() {
    return SerializerOpts(this);
  }

  static associate({ practicePapers, examinations }) {
    practicePapers.belongsTo(examinations);
    examinations.hasMany(practicePapers);
  }
}

module.exports = (sequelize, DataTypes) => {
  PracticePaper.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      documentUrl: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'practicePapers',
    },
  );
  return PracticePaper;
};
