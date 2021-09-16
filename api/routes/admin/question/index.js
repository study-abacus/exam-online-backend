const AdminRoleRequired = require('hooks/admin-role-required');
const Controllers = require('./controllers');

module.exports = async (app, opts) => {
  app.get(
    '/',
    { preHandler: AdminRoleRequired },
    Controllers.QuestionsListController.asHandler('get'),
  );
  app.get(
    '/:id',
    {
      preHandler: AdminRoleRequired,
    },
    Controllers.QuestionDetailController.asHandler('get'),
  );
  app.post(
    '/',
    { preHandler: AdminRoleRequired },
    Controllers.QuestionCreateController.asHandler('post'),
  );
  app.patch(
    '/:id',
    { preHandler: AdminRoleRequired },
    Controllers.QuestionsUpdateController.asHandler('patch'),
  );
  app.delete(
    '/:id',
    { preHandler: AdminRoleRequired },
    Controllers.QuestionDeleteController.asHandler('delete'),
  );
};

module.exports.autoPrefix = '/admin/questions';
