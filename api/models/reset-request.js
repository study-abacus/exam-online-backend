const { Model } = require('sequelize');

class ResetRequests extends Model {
  static associate({ users, resetRequests }) {
    resetRequests.belongsTo(users);
    users.hasMany(resetRequests);
  }
}

module.exports = (sequelize, DataTypes) => {
  ResetRequests.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      resetToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      validTill: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'resetRequests',
    },
  );

  return ResetRequests;
};
