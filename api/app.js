require('dotenv').config();
const Fastify = require('fastify');
const FastifyCors = require('fastify-cors');
const FastifyQS = require('fastify-qs');
const Autoload = require('fastify-autoload');
const path = require('path');
const config = require('config');
const Services = require('services');
const { Error } = require('jsonapi-serializer');

const app = Fastify({
  logger: process.env.NODE_ENV !== 'production',
});

app
  .register(FastifyCors, {
    origin: [
      'http://localhost:4200',
      'https://examination.studyabacus.com',
      'http://test.examination',
    ],
    credentials: true,
  })
  .register(FastifyQS)
  .register(Autoload, {
    dir: path.join(__dirname, 'plugins'),
    options: {},
  })
  .register(Services)
  .register(Autoload, {
    dir: path.join(__dirname, 'routes'),
    options: {
      prefix: '/api',
    },
  })
  .setErrorHandler((error, request, reply) => {
    console.log(error);

    const { validation, validationContext } = error;
    if (validation) {
      const response = {
        message: `A validation error occurred when validating the ${validationContext}`,
        errors: validation,
      };
      return reply.code(400).send(response);
    }

    if (error.__isApiError) {
      const resp = new Error({
        title: error.title,
        detail: error.detail,
        code: error.code,
      });

      return reply.code(error.statusCode).send(resp);
    }

    return reply.code(500).send(error);
  })
  .listen(config.SERVER.PORT, '0.0.0.0')
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });

module.exports = app;
