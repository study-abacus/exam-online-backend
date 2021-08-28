const twilio = require('twilio');
const { ACCOUNT_SID: accountSid, AUTH_TOKEN: authToken, PHONE_NUMBER } = require('config').TWILIO;

class SmsService {
  constructor(app) {
    this.app = app;
    this._client = twilio(accountSid, authToken);
  }

  sendMessage(body = 'Hola amigo', phone) {
    this._client.messages
      .create({ body, from: PHONE_NUMBER, to: `+91${phone}` })
      .then((message) => console.log(message.sid));
  }
}

module.exports = SmsService;
