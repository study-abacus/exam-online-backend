const DB = require('models');
const ApiError = require('base/error');
const ModelController = require('base/controllers/modelController');
const { random } = require('utils/random');

class OtpLoginController extends ModelController {
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
      throw new ApiError('User not found');
    }
    const redisClient = this.app.getService('redis');
    const smsClient = this.app.getService('sms');
    const phone = this.request.body.phone;
    const otp = random();
    redisClient.set(phone, otp, 60 * 5);
    smsClient.sendMessage(otp, phone);
    return {
      message: 'OTP Sent',
    };
  }
}

module.exports = {
  OtpLoginController,
};
