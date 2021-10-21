const Controller = require('./controller');
const Schema = require('./schema');

module.exports = async (app, opts) => {
  app.post(
    '/login',
    {
      schema: Schema.loginSchema,
      validatorCompiler: ({ schema, method, url, httpPart }) => {
        return (data) => schema.validate(data);
      },
    },
    Controller.LOGIN(app),
  );
};

module.exports.autoPrefix = '/admin/jwt';
