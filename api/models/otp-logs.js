const JsonApiModel = require('base/jsonApiModel');

class OTPLog extends JsonApiModel {
  static get serializerOpts() {
    return {};
  }

  static associate() {}
}

module.exports = (sequelize, DataTypes) => {
  OTPLog.init(
    {
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otp: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'otpLogs',
    },
  );
  return OTPLog;
};
