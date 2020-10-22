const fp = require('fastify-plugin');
const jwt = require('jsonwebtoken');
const config = require('config');

const encodeJwt = (payload) => jwt.sign(payload, config.SERVER.SECRET, { expiresIn: '2d' });
const decodeJwt = (token) => jwt.verify(token, config.SERVER.SECRET);

module.exports = fp((app, opts, next) => {
  app.decorate('encodeJwt', encodeJwt);
  app.decorate('decodeJwt', decodeJwt);

  next();
});
