const { Model } = require('sequelize');

class UserLocal extends Model {
  static associate({ userLocals, users }) {
    userLocals.belongsTo(users);
  }
}

module.exports = (sequelize, DataTypes) => {
  UserLocal.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'userLocals',
    },
  );

  return UserLocal;
};
