const AdminRoleRequired = require('hooks/admin-role-required');
const Controllers = require('./controllers');

module.exports = async (app, opts) => {
  app.get(
    '/:id',
    {
      preHandler: AdminRoleRequired,
    },
    Controllers.EventDetailController.asHandler('get'),
  );

  app.post(
    '/',
    { preHandler: AdminRoleRequired },
    Controllers.EventCreateController.asHandler('post'),
  );

  app.patch(
    '/:id',
    { preHandler: AdminRoleRequired },
    Controllers.EventUpdateController.asHandler('patch'),
  );

  app.delete(
    '/:id',
    { preHandler: AdminRoleRequired },
    Controllers.EventDeleteController.asHandler('delete'),
  );
};

module.exports.autoPrefix = '/admin/events';
