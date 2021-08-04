const AdminRoleRequired = require('hooks/admin-role-required');
const ApiError = require('base/error');
const DB = require('models');
const Controllers = require('./controllers');

const getExamIdFromQuestion = async (request) => {
  const question = await DB.questions.findByPk(request.params.id);
  if (!question) {
    throw new ApiError(
      {
        title: 'Question not found',
      },
      404,
    );
  }
  return question.examinationId;
};

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

  app.get(
    '/:id/current-question-attempt',
    {
      preHandler: AdminRoleRequired,
    },
    Controllers.CurrentQuestionAttemptController.asHandler('get'),
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
    Controllers.QuestionDetailController.asHandler('delete'),
  );
};

module.exports.autoPrefix = '/admin/questions';
