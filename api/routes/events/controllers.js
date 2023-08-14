const BaseListController = require('base/controllers/listController');
const BaseDetailController = require('base/controllers/detailController');
const DB = require('models');

class EventListController extends BaseListController {
  model = DB.events;
}

class EventDetailController extends BaseDetailController {
  model = DB.events;
}

module.exports = {
  EventListController,
  EventDetailController,
};
