const DB = require('models');
const { pass2hash } = require('utils/password');

const createUserAfterSignUp = async (params) => {
  const { name, username, password, phone } = params;
  const passwordHash = await pass2hash(password);

  const userLocal = await DB.userLocals.create(
    {
      passwordHash,
      user: {
        name,
        username,
        phone,
      },
    },
    {
      include: [DB.users],
    },
  );

  return DB.users.findByPk(userLocal.user.id);
};

module.exports = {
  createUserAfterSignUp,
};
