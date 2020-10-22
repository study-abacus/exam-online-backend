const Schema = require('./schema');
const Controllers = require('./controllers');
const LoginRequired = require('hooks/login-required');
const schema = require('./schema');

module.exports = async (app, opts) => {
  app.post(
    '/buy',
    {
      schema: Schema.postSchema,
      preHandler: LoginRequired,
    },
    Controllers.OrdersDetailController.asHandler('post', app),
  );
  app.get(
    '/:id',
    {
      preHandler: LoginRequired,
    },
    Controllers.OrdersDetailController.asHandler('get'),
  );
  app.post(
    '/:id/pay',
    {
      preHandler: LoginRequired,
    },
    Controllers.OrdersDetailController.asHandler('postOrderPaymentStart', app),
  );
  app.post(
    '/:id/capture',
    {
      schema: schema.postCaptureSchema,
      preHandler: LoginRequired,
    },
    Controllers.OrdersDetailController.asHandler('postPaymentCapture', app),
  );
};

module.exports.autoPrefix = '/orders';
