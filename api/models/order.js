const { Model } = require('sequelize');
const JsonApiModel = require('base/jsonApiModel');
const SerializerOpts = require('serializer-opts/order');

class Order extends JsonApiModel {
  static get serializerOpts() {
    return SerializerOpts(this);
  }

  static associate({ orders, users, events }) {
    orders.belongsTo(users);
    users.hasMany(orders);
    orders.belongsTo(events);
  }
}

module.exports = (sequelize, DataTypes) => {
  Order.init(
    {
      amount: {
        type: DataTypes.BIGINT,
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
      isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      razorpayOrderId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'orders',
    },
  );
  return Order;
};
