const bcrypt = require('bcrypt');
const saltRounds = 10;

const pass2hash = (pass) => bcrypt.hash(pass, saltRounds);
const compare2hash = (pass, hash) => bcrypt.compare(pass, hash);

module.exports = {
  pass2hash,
  compare2hash,
};
