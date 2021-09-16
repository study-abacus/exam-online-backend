const ModelController = require('./modelController');
const ApiError = require('base/error');

class BaseDeleteController extends ModelController {
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

  async delete() {
    try {
      const instance = await this.getObject();
      await instance.destroy();
      this.response.statusCode = 204;
      return {};
    } catch (error) {
      throw new ApiError({ title: 'Could not delete the specified item', detail: error }, 400);
    }
  }
}

module.exports = BaseDeleteController;
