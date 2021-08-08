const ModelController = require('./modelController');
const { Deserializer } = require('jsonapi-serializer');

class BaseCreateController extends ModelController {
  async post() {
    const obj = await this.deserialize(this.request.body);

    await this.beforeCreate(obj);
    const dbObj = await this.model.create(obj);
    await this.afterCreate(dbObj);

    const instance = await this.model.findByPk(dbObj.id, {
      include: this.generateIncludeClause(),
    });

    return this.serialize(instance);
  }

  // Hooks
  async beforeCreate(model) {}
  async afterCreate(model) {}
}

module.exports = BaseCreateController;
