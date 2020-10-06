const {
  Model
} = require('sequelize');

class UserLocal extends Model {
  static associate({ userLocals, users }) {
    userLocals.belongsTo(users)
  }
};

module.exports = (sequelize, DataTypes) => {
  UserLocal.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'userLocals',
  });

  return UserLocal;
};
