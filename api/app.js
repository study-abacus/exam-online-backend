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
    // Who thought it was a good idea to recursively import all the sub directories
    // because that's how we keep our modules?
    // God bless the stupid souls who made some of the great minds of open source
    // make such an API just so their stupidity can be accomodated for and make the
    // framework widely acceptable.
    //
    // and yet in a metter of minutes I realize the stupidity I was talking about.
    // We stupids are so used to the abstraction that our ability to think creatively
    // is practically dead. God Bless the future of software engineeering with Stupids
    // like myself contributing to it.
    //
    // maxDepth: 1,
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
