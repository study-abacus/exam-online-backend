const DB = require('models');
const { pass2hash } = require('utils/password');

const createUserAfterSignUp = async params => {
  const { name, email, password } = params;
  const passwordHash = await pass2hash(password);

  return DB.users.create({
    name,
    email,
    userLocal: {
      password: passwordHash
    }
  })
}

module.exports = {
  createUserAfterSignUp
}
