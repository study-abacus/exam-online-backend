const AdminRoleRequired = require('hooks/admin-role-required');
const Controllers = require('./controllers');

module.exports = async (app, opts) => {
  app.get(
    '/user/:id',
    {
      preHandler: AdminRoleRequired,
    },
    Controllers.ExamAttemptListController.asHandler('get'),
  );
  app.get(
    '/:id',
    {
      preHandler: AdminRoleRequired,
    },
    Controllers.ExamAttemptDetailController.asHandler('get'),
  );

  app.post(
    '/',
    { preHandler: AdminRoleRequired },
    Controllers.ExamAttemptCreateController.asHandler('post'),
  );

  app.patch(
    '/:id',
    { preHandler: AdminRoleRequired },
    Controllers.ExamAttemptUpdateController.asHandler('patch'),
  );
};

module.exports.autoPrefix = '/admin/exam-attempts';
