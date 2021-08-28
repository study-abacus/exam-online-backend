const Schema = require('./schema');
const Controllers = require('./controllers');

module.exports = async (app, opts) => {
  app.post(
    '/',
    { schema: Schema.postSchema },
    Controllers.OtpLoginController.asHandler('post', app),
  );
};

module.exports.autoPrefix = '/otp';
