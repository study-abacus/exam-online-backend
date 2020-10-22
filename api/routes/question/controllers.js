const BaseDetailController = require('base/controllers/detailController');
const DB = require('models');

class QuestionDetailController extends BaseDetailController {
    model = DB.questions;
}

module.exports = {
    QuestionDetailController
}
