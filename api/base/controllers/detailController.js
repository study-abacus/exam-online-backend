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

  getDefaults() {
    return {
      ...this.request.body,
    };
  }

  updateObject() {
    try {
      return this.model.update(
        { ...this.getDefaults() },
        { where: { id: this.request.params.id, ...this.generateWhereClause() } },
      );
    } catch (error) {
      throw new ApiError(
        { title: 'Could not create instance of the specified item', detail: error },
        400,
      );
    }
  }

  async post() {
    const result = await this.model.create(this.request.body);
    return result;
  }

  async patch() {
    try {
      const success = await this.updateObject();
      if (success) {
        return this.getObject();
      }
    } catch (error) {
      throw new ApiError({ title: 'Could not update the specified item', detail: error }, 400);
    }
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
