const FastifyAuth = require('fastify-auth');
const fp = require('fastify-plugin');
const Handlers = require('./handlers');
const { parseAuthHeaders } = require('./utils');

module.exports = fp((app, opts, done) => {
  const authMiddleware = async (request, reply) => {
    const [type, token] = parseAuthHeaders(request.headers);

    if (!type || !token) return;

    if (!(type in Handlers)) {
      throw new Error({
        title: 'Authorization not supported',
      });
    }

    const user = await Handlers[type](app, token);
    request.user = user;
  };

  app
    .decorate('verifyLogin', authMiddleware)
    .register(FastifyAuth)
    .after(() => {
      app.addHook('preHandler', app.auth([app.verifyLogin]));
    });

  done();
});
