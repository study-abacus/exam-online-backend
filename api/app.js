const Fastify = require('fastify');
const Autoload = require('fastify-autoload');
const path = require('path');
const config = require('config');

const app = Fastify({
  logger: process.env.NODE_ENV !== 'production'
})

app
  .register(Autoload, {
    dir: path.join(__dirname, 'routes'),
    options: { 
      prefix: '/api' 
    }
  })
  .listen(config.SERVER.PORT, '0.0.0.0')
  .catch(err => {
    app.log.error(err)
    process.exit(1)
  })

module.exports = app
