const {
  Model
} = require('sequelize');

class VerifyRequests extends Model {
  static associate({ users, verifyRequests }) {
    verifyRequests.belongsTo(users);
    users.hasMany(verifyRequests)
  }
};

module.exports = (sequelize, DataTypes) => {
  VerifyRequests.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    validTill: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'verifyRequests',
  });

  return VerifyRequests;
};
