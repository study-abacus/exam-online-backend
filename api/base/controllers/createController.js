const ModelController = require('./modelController');
const { Deserializer } = require('jsonapi-serializer');

class BaseCreateController extends ModelController {
  async deserialize(payload) {
    const deserializer = new Deserializer({
      keyForAttribute: 'camelCase',
      ...this.model.deserializerOpts,
    });

    const obj = await deserializer.deserialize(payload);

    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
        obj[key + 'Id'] = obj[key].id;
      }
    });

    return obj;
  }

  async serialize(instance) {
    return instance.toJsonApiPayload();
  }

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
