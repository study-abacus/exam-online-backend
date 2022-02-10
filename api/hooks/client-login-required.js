const ApiError = require('base/error');
const ClientUser = require('base/clientUser');

const clientLoginRequired = async (request, reply) => {
  if (!request.user || !request.user instanceof ClientUser) {
    throw new ApiError(
      {
        title: 'Login Required',
      },
      401,
    );
  }
};

module.exports = clientLoginRequired;
