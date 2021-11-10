const Schema = require('./schema');
const Controllers = require('./controllers');
const { limitedSmsToPhoneNumber } = require('./hooks');

module.exports = async (app, opts) => {
  app.post(
    '/',
    {
      schema: Schema.postSchema,
      preHandler: [limitedSmsToPhoneNumber(app)],
    },
    Controllers.OtpLoginController.asHandler('post', app),
  );

  app.post(
    '/new',
    {
      schema: Schema.postSchema,
      preHandler: [limitedSmsToPhoneNumber(app)],
    },
    Controllers.OtpSignupController.asHandler('post', app),
  );
};

module.exports.autoPrefix = '/otp';
