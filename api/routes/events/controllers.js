const BaseListController = require('base/controllers/listController');
const DB = require('models');

class EventListController extends BaseListController {
  model = DB.events;
}

module.exports = {
  EventListController,
};
