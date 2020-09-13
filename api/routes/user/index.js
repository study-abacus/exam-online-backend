module.exports = async (app, opts) => {
  app.get('/', (req, res) => "Hello World")
}

module.exports.autoPrefix = '/users'
