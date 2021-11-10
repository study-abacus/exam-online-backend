const twilio = require('twilio');
const { ACCOUNT_SID: accountSid, AUTH_TOKEN: authToken, PHONE_NUMBER } = require('config').TWILIO;

class SmsService {
  constructor(app) {
    this.app = app;
    this._client = twilio(accountSid, authToken);
  }

  sendMessage(otp, phone) {
    const body = `Your Study Abacus Online Exam Profile OTP is ${otp}. This OTP will be valid for 5 minutes.`;
    this._client.messages
      .create({ body, from: PHONE_NUMBER, to: `+91${phone}` })
      .then((message) => console.log(message.sid));
  }
}

module.exports = SmsService;
