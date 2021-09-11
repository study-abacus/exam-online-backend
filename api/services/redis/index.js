const config = require('config');
const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor(app) {
    this._app = app;
    const client = redis.createClient();
    client.on('error', function (error) {
      console.error(error);
    });

    const getAsync = promisify(client.get).bind(client);
    client.get = getAsync;
    this._client = client;
  }

  set(key, value, timeout = 60 * 5) {
    this._client.setex(key, timeout, value);
  }

  async get(key) {
    return this._client.get(key);
  }
}

module.exports = RedisClient;
