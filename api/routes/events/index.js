const Controllers = require('./controllers');
const LoginRequired = require('hooks/login-required');

module.exports = async (app, opts) => {
  app.get('/', Controllers.EventListController.asHandler('get'));

  app.get(
    '/:id',
    {
      preHandler: [LoginRequired],
    },
    Controllers.EventDetailController.asHandler('get'),
  );
};

module.exports.autoPrefix = '/events';
