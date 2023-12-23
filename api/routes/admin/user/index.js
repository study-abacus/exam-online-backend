const Controllers = require('./controllers');
const AdminRoleRequired = require('hooks/admin-role-required');

module.exports = async (app, opts) => {
  app.get(
    '/me',
    { preHandler: AdminRoleRequired },
    Controllers.UserDetailController.asHandler('getMe'),
  );
  app.get(
    '/:id',
    { preHandler: AdminRoleRequired },
    Controllers.UserDetailController.asHandler('get'),
  );
  app.get('/', { preHandler: AdminRoleRequired }, Controllers.UserListController.asHandler('get'));
  app.post('/', { preHandler: AdminRoleRequired }, Controllers.UserCreateController.asHandler('post'));
  app.patch('/:id', { preHandler: AdminRoleRequired }, Controllers.UserUpdateController.asHandler('patch'));
  app.get(
    '/:id/relationships/exam-attempts',
    { preHandler: AdminRoleRequired },
    Controllers.UserExamAttemptsDetailController.asHandler('get'),
  );
};

module.exports.autoPrefix = '/admin/users';
