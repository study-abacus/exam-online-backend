const Controllers = require('./controllers');
const AdminRoleRequired = require('hooks/admin-role-required');

module.exports = async (app, opts) => {
  app.get(
    '/:id',
    { preHandler: AdminRoleRequired },
    Controllers.UserLocalDetailController.asHandler('get'),
  );
  app.get('/', { preHandler: AdminRoleRequired }, Controllers.UserLocalListController.asHandler('get'));
  app.post('/', { preHandler: AdminRoleRequired }, Controllers.UserLocalCreateController.asHandler('post'));
  app.patch('/:id', { preHandler: AdminRoleRequired }, Controllers.UserLocalUpdateController.asHandler('patch'));
};

module.exports.autoPrefix = '/admin/user-locals';
