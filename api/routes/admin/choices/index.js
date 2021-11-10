const AdminRoleRequired = require('hooks/admin-role-required');
const Controllers = require('./controllers');

module.exports = async (app, opts) => {
  app.get(
    '/:id',
    {
      preHandler: AdminRoleRequired,
    },
    Controllers.ChoiceDetailController.asHandler('get'),
  );
  app.post(
    '/',
    { preHandler: AdminRoleRequired },
    Controllers.ChoiceCreateController.asHandler('post'),
  );
  app.patch(
    '/:id',
    { preHandler: AdminRoleRequired },
    Controllers.ChoiceUpdateController.asHandler('patch'),
  );
  app.delete(
    '/:id',
    { preHandler: AdminRoleRequired },
    Controllers.ChoiceDeleteController.asHandler('delete'),
  );
};

module.exports.autoPrefix = '/admin/choices';
