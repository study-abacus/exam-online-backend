const redis = require('redis');
const client = redis.createClient();
const { promisify } = require('util');

client.on('error', function (error) {
  console.error(error);
});

const getAsync = promisify(client.get).bind(client);

module.exports = getAsync;
