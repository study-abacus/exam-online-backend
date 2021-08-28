const { v4: uuid } = require('uuid');

function randomGenerator() {
  const id = uuid();
  return id.substr(0, 5);
}

module.exports = {
  randomGenerator,
};
