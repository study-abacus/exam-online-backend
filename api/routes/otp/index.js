const Schema = require('./schema');
const Controllers = require('./controllers');

module.exports = async (app, opts) => {
  app.post(
    '/',
    {
      schema: Schema.postSchema,
      validatorCompiler: ({ schema, method, url, httpPart }) => {
        return (data) => schema.validate(data);
      },
    },
    Controllers.OtpLoginController.asHandler('post', app),
  );
};

module.exports.autoPrefix = '/otp';
