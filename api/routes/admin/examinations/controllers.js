const BaseListController = require('base/controllers/listController');
const BaseDetailController = require('base/controllers/detailController');
const BaseCreateController = require('base/controllers/createController');
const BaseUpdateController = require('base/controllers/updateController');
const DB = require('models');

class ExaminationListController extends BaseListController {
  model = DB.examinations;

  generateWhereClause() {
    const whereClause = super.generateWhereClause();

    return {
      ...whereClause,
      unlisted: false,
    };
  }

  generateOrderClause() {
    return ['id'];
  }
}

class RelationshipQuestionController extends BaseListController {
  model = DB.questions;

  generateWhereClause() {
    return {
      examinationId: this.request.params.id,
    };
  }

  generateOrderClause() {
    return ['id'];
  }
}

class RelationshipPracticePaperController extends BaseListController {
  model = DB.practicePapers;

  generateWhereClause() {
    return {
      examinationId: this.request.params.id,
    };
  }
}

class ExaminationCreateController extends BaseCreateController {
  model = DB.examinations;
}

class ExaminationUpdateController extends BaseUpdateController {
  model = DB.examinations;
}

class ExaminationDetailController extends BaseDetailController {
  model = DB.examinations;
}

class CurrentExamAttemptController extends BaseDetailController {
  model = DB.examAttempts;
  generateWhereClause() {
    return {
      examinationId: this.request.params.id,
      userId: this.request.user.id,
    };
  }
  getObject() {
    return this.model.findOne({
      where: {
        ...this.generateWhereClause(),
      },
      include: this.generateIncludeClause(),
    });
  }
}

module.exports = {
  ExaminationListController,
  RelationshipQuestionController,
  ExaminationDetailController,
  CurrentExamAttemptController,
  RelationshipPracticePaperController,
  ExaminationCreateController,
  ExaminationUpdateController,
};
