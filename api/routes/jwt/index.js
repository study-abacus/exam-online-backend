const Controller = require('./controller');
const Schema = require('./schema');

module.exports = async (app, opts) => {
  app.post(
    '/login',
    {
      schema: Schema.loginSchema
    },
    Controller.LOGIN(app)
  )
}

module.exports.autoPrefix = '/jwt'
