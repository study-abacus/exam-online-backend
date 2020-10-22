const LoginRequired = require('hooks/login-required');

const Controllers = require('./controllers');

module.exports = async (app, opts) => {
  app.get(
    '/:id',
    {
      preHandler: LoginRequired,
    },
    Controllers.QuestionDetailController.asHandler('get'),
  );
};

module.exports.autoPrefix = '/questions';
