const { Serializer, Deserializer } = require('jsonapi-serializer');
const JsonApiModel = require('base/jsonApiModel');

const SerializerMixin = (Base) =>
  class extends Base {
    modelName = null;
    serializerOpts = null;
    deserializerOpts = null;

    async serialize(instance) {
      const serializer = this.getSerializer();
      return serializer.serialize(instance);
    }

    async deserialize(payload) {
      const deserializer = this.getDeserializer();

      const obj = await deserializer.deserialize(payload);

      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
          obj[key + 'Id'] = obj[key].id;
        }
      });

      return obj;
    }

    getSerializer() {
      if (this.modelName && this.serializerOpts) {
        return new Serializer(this.modelName, this.serializerOpts);
      }

      if (this.model.prototype instanceof JsonApiModel) {
        return new Serializer(this.model.name, this.model.serializerOpts);
      }

      throw new Error(
        'Either (modelName and serializerOpts) or model of type JsonApiModel should be defined',
      );
    }

    getDeserializer() {
      if (this.deserializerOpts) {
        return new Deserializer({ keyForAttribute: 'camelCase', ...this.deserializerOpts });
      }

      if (this.model.prototype instanceof JsonApiModel) {
        return new Deserializer({ keyForAttribute: 'camelCase', ...this.model.deserializerOpts });
      }

      throw new Error('Either deserializerOpts or model of type JsonApiModel should be defined');
    }
  };

module.exports = SerializerMixin;
