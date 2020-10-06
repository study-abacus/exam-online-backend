const Fastify = require('fastify');
const Autoload = require('fastify-autoload');
const path = require('path');
const config = require('config');
const ApiError = require('base/error');

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
  .setErrorHandler((error, request, reply) => {
    if (error instanceof ApiError) {
      return reply
        .code(error.statusCode)
        .send(error.toJsonApiResponse());
    }

    return reply.code(500).send(error);
  })
  .listen(config.SERVER.PORT, '0.0.0.0')
  .catch(err => {
    app.log.error(err)
    process.exit(1)
  })

module.exports = app
