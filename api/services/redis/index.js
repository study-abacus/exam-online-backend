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

  get client() {
    return this._client;
  }
}

module.exports = RedisClient;
