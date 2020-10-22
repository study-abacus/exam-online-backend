const BaseController = require('./modelController');

class BaseDetailController extends BaseController {
  model = null;

  async serialize(instance) {
    return instance.toJsonApiPayload();
  }

  getObject() {
    return this.model.findOne({
      where: {
        id: this.request.params.id,
        ...this.generateWhereClause(),
      },
      include: this.generateIncludeClause(),
    });
  }

  async get() {
    const instance = await this.getObject();

    if (!instance) {
      return this.response.callNotFound();
    }
    return this.serialize(instance);
  }
}

module.exports = BaseDetailController;
