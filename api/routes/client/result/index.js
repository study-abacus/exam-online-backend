const ClientLoginRequired = require('hooks/client-login-required');
const Controllers = require('./controllers');
const Schema = require('./schema');

module.exports = async (app, opts) => {
  app.post(
    '/',
    {
      schema: Schema.resultSchema,
      preHandler: [ClientLoginRequired],
    },
    Controllers.ResultController.asHandler('post'),
  );
};

module.exports.autoPrefix = '/client/result';
