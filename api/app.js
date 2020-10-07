const Fastify = require('fastify');
const FastifyCors = require('fastify-cors');
const Autoload = require('fastify-autoload');
const path = require('path');
const config = require('config');
const Services = require('services');
const { Error } = require('jsonapi-serializer');

const app = Fastify({
  logger: process.env.NODE_ENV !== 'production'
})

app
  .register(FastifyCors, {
    origin: ['http://localhost:4200'],
    credentials: true
  })
  .register(Autoload, {
    dir: path.join(__dirname, 'plugins'),
    options: {}
  })
  .register(Services)
  .register(Autoload, {
    dir: path.join(__dirname, 'routes'),
    options: { 
      prefix: '/api' 
    }
  })
  .setErrorHandler((error, request, reply) => {
    if (error.__isApiError) {
      const resp = new Error({
        title: error.title,
        detail: error.detail,
        code: error.code
      })

      return reply
        .code(error.statusCode)
        .send(resp);
    }

    return reply.code(500).send(error);
  })
  .listen(config.SERVER.PORT, '0.0.0.0')
  .catch(err => {
    app.log.error(err)
    process.exit(1)
  })

module.exports = app
