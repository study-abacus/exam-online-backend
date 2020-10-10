const {
  Model
} = require('sequelize');
const { Serializer } = require('jsonapi-serializer');

class JsonApiModel extends Model {
  attributes = ['id'];
  includedConfig = {};

  static get serializerOpts() {
    return {
      attributes: this.attributes,
      meta: {
        pagination: records => records.pagination
      },
      ...this.includedConfig
    }
  }

  toJsonApiPayload() {
    const serializer = new Serializer(this.constructor.name, this.constructor.serializerOpts)
    return serializer.serialize(this)
  }

  static listToJsonApiPayload(instances) {
    const serializer = new Serializer(this.name, this.serializerOpts)
    return serializer.serialize(instances)
  }
}

module.exports = JsonApiModel;
