const BaseDetailController = require('base/controllers/detailController');
const BaseCreateController = require('base/controllers/createController');
const BaseUpdateController = require('base/controllers/updateController');
const BaseDeleteController = require('base/controllers/deleteController');
const DB = require('models');
const EventSerializerOpts = require('serializer-opts/admin/event');

class EventDetailController extends BaseDetailController {
  model = DB.events;
  modelName = DB.events.name;
  serializerOpts = EventSerializerOpts(DB.events.name);
}

class EventDeleteController extends BaseDeleteController {
  model = DB.events;
  modelName = DB.events.name;
  serializerOpts = EventSerializerOpts(DB.events.name);
}

class EventCreateController extends BaseCreateController {
  model = DB.events;
  modelName = DB.events.name;
  serializerOpts = EventSerializerOpts(DB.events.name);
}

class EventUpdateController extends BaseUpdateController {
  model = DB.events;
  modelName = DB.events.name;
  serializerOpts = EventSerializerOpts(DB.events.name);
}

module.exports = {
  EventDetailController,
  EventDeleteController,
  EventCreateController,
  EventUpdateController,
};
