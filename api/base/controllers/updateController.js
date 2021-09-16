const CreateController = require('./createController');
const { removeNonEditableAttrs } = require('./utils');

class BaseUpdateController extends CreateController {
  nonEditableAttrs = [];

  get _nonEditableAttrs() {
    return [...this.nonEditableAttrs, 'id'];
  }

  getObject() {
    return this.model.findByPk(this.request.params.id);
  }

  async patch() {
    const instance = await this.getObject();

    if (!instance) {
      return this.response.callNotFound();
    }

    let obj = await this.deserialize(this.request.body);
    obj = removeNonEditableAttrs(this._nonEditableAttrs, obj);

    await this.beforeUpdate(obj);
    await this.model.update(obj, {
      where: {
        id: instance.id,
      },
    });

    const result = await this.model.findByPk(instance.id, {
      include: this.generateIncludeClause(),
    });
    await this.afterUpdate(result);

    return this.serialize(result);
  }

  async beforeUpdate() {}
  async afterUpdate() {}
}

module.exports = BaseUpdateController;
