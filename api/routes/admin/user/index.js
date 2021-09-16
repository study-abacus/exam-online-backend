const Controllers = require('./controllers');
const AdminRoleRequired = require('hooks/admin-role-required');

module.exports = async (app, opts) => {
  app.get(
    '/:id',
    { preHandler: AdminRoleRequired },
    Controllers.UserDetailController.asHandler('get'),
  );
  app.get('/', { preHandler: AdminRoleRequired }, Controllers.UserListController.asHandler('get'));
  app.get(
    '/:id/exam-attempts',
    { preHandler: AdminRoleRequired },
    Controllers.UserExamAttemptsDetailController.asHandler('get'),
  );
};

module.exports.autoPrefix = '/admin/users';
