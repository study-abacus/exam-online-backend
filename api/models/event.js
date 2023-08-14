const JsonApiModel = require('base/jsonApiModel');
const SerializerOpts = require('serializer-opts/event');

class Event extends JsonApiModel {
  static get serializerOpts() {
    return SerializerOpts(this);
  }

  static associate() {}
}

module.exports = (sequelize, DataTypes) => {
  Event.init(
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
      examinations: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      primaryPrice: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      secondaryPrice: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'events',
    },
  );
  return Event;
};
