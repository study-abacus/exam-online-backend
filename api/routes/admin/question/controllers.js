const BaseDetailController = require('base/controllers/detailController');
const BaseListController = require('base/controllers/listController');
const BaseCreateController = require('base/controllers/createController');
const BaseUpdateController = require('base/controllers/updateController');
const BaseDeleteController = require('base/controllers/deleteController');
const DB = require('models');
const QuestionSerializerOpts = require('serializer-opts/admin/question');

class QuestionDetailController extends BaseDetailController {
  model = DB.questions;
  modelName = DB.questions.name;
  serializerOpts = QuestionSerializerOpts(DB.questions.name);

  defaultExcludes = ['questionAttempts'];
}

class QuestionDeleteController extends BaseDeleteController {
  model = DB.questions;
  modelName = DB.questions.name;
  serializerOpts = QuestionSerializerOpts(DB.questions.name);
}

class QuestionCreateController extends BaseCreateController {
  model = DB.questions;
  modelName = DB.questions.name;
  deserializerOpts = QuestionSerializerOpts(DB.questions.name, 'deserialize');
}

class QuestionsUpdateController extends BaseUpdateController {
  model = DB.questions;
  modelName = DB.questions.name;
  deserializerOpts = QuestionSerializerOpts(DB.questions.name, 'deserialize');
}
class QuestionsListController extends BaseListController {
  model = DB.questions;
  modelName = DB.questions.name;
  serializerOpts = QuestionSerializerOpts(DB.questions.name);
}

module.exports = {
  QuestionDetailController,
  QuestionsListController,
  QuestionCreateController,
  QuestionsUpdateController,
  QuestionDeleteController,
};
