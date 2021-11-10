const BaseDetailController = require('base/controllers/detailController');
const BaseCreateController = require('base/controllers/createController');
const BaseUpdateController = require('base/controllers/updateController');
const BaseDeleteController = require('base/controllers/deleteController');
const DB = require('models');
const ChoiceSerializerOpts = require('serializer-opts/admin/choice');

class ChoiceDetailController extends BaseDetailController {
  model = DB.choices;
  modelName = DB.choices.name;
  serializerOpts = ChoiceSerializerOpts(DB.choices.name);
}

class ChoiceDeleteController extends BaseDeleteController {
  model = DB.choices;
  modelName = DB.choices.name;
  serializerOpts = ChoiceSerializerOpts(DB.choices.name);
}

class ChoiceCreateController extends BaseCreateController {
  model = DB.choices;
  modelName = DB.choices.name;
  deserializerOpts = ChoiceSerializerOpts(DB.choices.name, 'deserialize');
}

class ChoiceUpdateController extends BaseUpdateController {
  model = DB.choices;
  modelName = DB.choices.name;
  deserializerOpts = ChoiceSerializerOpts(DB.choices.name, 'deserialize');
}

module.exports = {
  ChoiceDetailController,
  ChoiceDeleteController,
  ChoiceCreateController,
  ChoiceUpdateController,
};
