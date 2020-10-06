const {
  Model
} = require('sequelize');
const { Serializer } = require('jsonapi-serializer');

class JsonApiModel extends Model {
  attributes = ['id'];

  get serializerOpts() {
    return {
      attributes: this.attributes
    }
  }

  toJsonApiPayload() {
    const serializer = new Serializer(this.constructor.name, this.serializerOpts)
    return serializer.serialize(this)
  }
}

module.exports = JsonApiModel;
