const DB = require('models');
const Moment = require('moment');
const { Op } = require('sequelize');
const config = require('config');

class LimitOtpService {
  constructor(app) {
    this._app = app;
  }

  async canSendOtp(phone) {
    const totalOtpSentInADay = await DB.otpLogs.count({
      where: {
        phone,
        createdAt: {
          [Op.gt]: Moment().startOf('day'),
          [Op.lt]: Moment().endOf('day'),
        },
      },
    });

    return totalOtpSentInADay < config.APP.OTP_DAILY_LIMIT;
  }

  async tickOtpSend(phone, otp) {
    await DB.otpLogs.create({
      phone,
      otp,
    });
  }
}

module.exports = LimitOtpService;
