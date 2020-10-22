const fp = require('fastify-plugin');

const lazyServiceMap = {};
const getService = (app) => (name) => {
  try {
    if (name in lazyServiceMap) {
      return lazyServiceMap[name];
    }

    const ServiceConstructor = require(`./${name}`);
    const service = new ServiceConstructor(app);
    lazyServiceMap[name] = service;

    return service;
  } catch (err) {
    console.log(err);
    if (err.code === 'MODULE_NOT_FOUND') {
      throw new Error(`Service '${name}' not found`);
    }
    throw err;
  }
};

module.exports = fp((app, opts, done) => {
  app.decorate('getService', getService(app));

  done();
});
