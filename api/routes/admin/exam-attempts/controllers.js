const BaseController = require('base/controllers/baseController');
const BaseDetailController = require('base/controllers/detailController');
const BaseListController = require('base/controllers/listController');
const BaseCreateController = require('base/controllers/createController');
const BaseUpdateController = require('base/controllers/updateController');
const DB = require('models');
const moment = require('moment');
const config = require('config');

class ExamAttemptDetailController extends BaseDetailController {
  model = DB.examAttempts;
}

class ExamAttemptCreateController extends BaseCreateController {
  model = DB.examAttempts;
}

class ExamAttemptUpdateController extends BaseUpdateController {
  model = DB.examAttempts;
}

class ExamAttemptListController extends BaseListController {
  model = DB.examAttempts;

  generateWhereClause() {
    return {
      userId: this.request.params.id,
    };
  }
}

class ExamAttemptVideoPingController extends BaseController {
  async post() {
    const examAttempt = await DB.examAttempts.findByPk(this.request.params.id);
    const _minioService = this.app.getService('minio');

    if (!examAttempt) {
      return this.response.callNotFound();
    }

    const name = `${examAttempt.id}/${moment().format('DD-MM-YY_hh:mm:ss')}.png`;
    const url = await _minioService.minioClient.presignedPutObject(config.MINIO.BUCKET_NAME, name);

    this.response.send({
      url,
    });
  }
}

module.exports = {
  ExamAttemptDetailController,
  ExamAttemptListController,
  ExamAttemptVideoPingController,
  ExamAttemptCreateController,
  ExamAttemptUpdateController,
};
