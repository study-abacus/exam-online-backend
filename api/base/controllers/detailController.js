const ModelController = require('./modelController');

class BaseDetailController extends ModelController {
  model = null;

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
