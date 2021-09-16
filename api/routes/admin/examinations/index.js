const Controllers = require('./controllers');
const AdminRoleRequired = require('hooks/admin-role-required');

module.exports = async (app, opts) => {
  app.get(
    '/',
    {
      preHandler: AdminRoleRequired,
    },
    Controllers.ExaminationListController.asHandler('get'),
  );
  app.get(
    '/:id/relationships/practice-papers',
    {
      preHandler: AdminRoleRequired,
    },
    Controllers.RelationshipPracticePaperController.asHandler('get'),
  );
  app.get(
    '/:id/relationships/questions',
    {
      preHandler: AdminRoleRequired,
    },
    Controllers.RelationshipQuestionController.asHandler('get'),
  );
  app.get(
    '/:id',
    {
      preHandler: AdminRoleRequired,
    },
    Controllers.ExaminationDetailController.asHandler('get'),
  );
  app.post(
    '/',
    { preHandler: AdminRoleRequired },
    Controllers.ExaminationCreateController.asHandler('post'),
  );

  app.patch(
    '/:id',
    { preHandler: AdminRoleRequired },
    Controllers.ExaminationUpdateController.asHandler('patch'),
  );
  app.delete(
    '/:id',
    { preHandler: AdminRoleRequired },
    Controllers.ExaminationDeleteController.asHandler('delete'),
  );
};

module.exports.autoPrefix = '/admin/examinations';
