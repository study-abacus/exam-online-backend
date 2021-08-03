const ApiError = require('base/error');

const adminRoleRequired = async (request, reply) => {
  if (!request.user || !request.user.roles.includes('admin')) {
    throw new ApiError(
      {
        title: 'Admin Access Required',
      },
      401,
    );
  }
};

module.exports = adminRoleRequired;
