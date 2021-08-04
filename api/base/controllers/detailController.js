const ModelController = require('./modelController');
const ApiError = require('base/error');

class BaseDetailController extends ModelController {
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

  async delete() {
    try {
      const instance = await this.getObject();
      await instance.destroy();
      return {
        success: true,
      };
    } catch (error) {
      throw new ApiError({ title: 'Could not delete the specified item', detail: error }, 400);
    }
  }
}

module.exports = BaseDetailController;
