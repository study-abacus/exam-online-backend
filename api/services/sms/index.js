const axios = require('axios');
const config = require('config');
const FormData = require('form-data');

class SmsService {
  constructor(app) {
    this._app = app;
    this._axios = axios.create({
      baseURL: config.TEXT_LOCAL.HOST,
    });
  }

  _sendMessage(phone, message) {
    const form = new FormData();
    form.append('apiKey', config.TEXT_LOCAL.API_KEY);
    form.append('numbers', `91${phone}`);
    form.append('sender', config.TEXT_LOCAL.HEADER);
    form.append('message', message);

    return this._axios.post('send', form, {
      headers: form.getHeaders(),
    });
  }

  sendOtp(otp, phone) {
    const body = `Your Study Abacus OTP is ${otp}. This OTP will be valid for the next 5 minutes.`;

    return this._sendMessage(phone, body);
  }
}

module.exports = SmsService;
