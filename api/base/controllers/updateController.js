const BaseController = require('./createController');

class BaseUpdateController extends BaseController {
  async patch() {
    const instance = await this.model.findByPk(this.request.params.id);

    if (!instance) {
      return this.response.callNotFound();
    }

    const obj = await this.deserialize(this.request.body)

    await this.beforeUpdate(obj);
    await this.model.update({
      ...obj
    }, {
      where: {
        id: instance.id
      }
    })
    
    const result = await this.model.findByPk(instance.id, {
      include: this.generateIncludeClause()
    })
    await this.afterUpdate(result)

    return this.serialize(result)
  }

  async beforeUpdate() {}
  async afterUpdate() {}
}

module.exports = BaseUpdateController;
