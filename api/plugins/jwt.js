const fp = require('fastify-plugin');
const jwt = require('jsonwebtoken');
const config = require('config');

const JWT_SECRET_MAP = {
  user: config.SERVER.SECRET,
  client: config.SERVER.CLIENT_SECRET,
};

const encodeJwt = (payload, source = 'user') =>
  jwt.sign(payload, JWT_SECRET_MAP[source], { expiresIn: '2d' });
const decodeJwt = (token, source = 'user') => jwt.verify(token, JWT_SECRET_MAP[source]);

module.exports = fp((app, opts, next) => {
  app.decorate('encodeJwt', encodeJwt);
  app.decorate('decodeJwt', decodeJwt);

  next();
});
