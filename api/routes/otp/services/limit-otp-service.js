const DB = require('models');
const Moment = require('moment');
const { Op } = require('sequelize');

class LimitOtpService {
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

    return totalOtpSentInADay < 3;
  }

  async tickOtpSend(phone, otp) {
    await DB.otpLogs.create({
      phone,
      otp,
    });
  }
}

module.exports = new LimitOtpService();
