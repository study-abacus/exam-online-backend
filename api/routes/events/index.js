const Controllers = require('./controllers');

module.exports = async (app, opts) => {
  app.get('/', Controllers.EventListController.asHandler('get'));
};

module.exports.autoPrefix = '/events';
