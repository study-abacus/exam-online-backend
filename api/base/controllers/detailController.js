const BaseController = require('./baseController');

class BaseDetailController extends BaseController {
  model = null;

  async serialize(instance) {
    return instance.toJsonApiPayload()
  }

  async get() {
    const instance = await this.model.findByPk(this.request.params.id)
    if (!instance) {
      return this.response.callNotFound()
    }
    return this.serialize(instance)
  }
}

module.exports = BaseDetailController;
