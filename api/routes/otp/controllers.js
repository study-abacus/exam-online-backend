const DB = require('models');
const ApiError = require('base/error');
const BaseDetailController = require('base/controllers/detailController');
const { randomGenerator } = require('utils/random');

class OtpLoginController extends BaseDetailController {
  model = DB.users;

  getObject() {
    return this.model.findOne({
      where: {
        phone: this.request.body.phone,
      },
      include: this.generateIncludeClause(),
    });
  }

  async post() {
    const user = await this.getObject();
    if (!user) {
      throw ApiError('User not found');
    }
    const redisClient = this.app.getService('redis').client;
    const smsClient = this.app.getService('sms');
    const phone = this.request.body.phone;
    const otp = randomGenerator();
    redisClient.setex(phone, 60 * 5, otp);
    smsClient.sendMessage(otp, phone);
    return {
      message: 'OTP Sent',
    };
  }
}

module.exports = {
  OtpLoginController,
};
