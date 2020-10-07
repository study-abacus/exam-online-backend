const BaseController = require('./baseController');

class BaseDetailController extends BaseController {
  model = null;

  async serialize(instances) {
    return this.model.listToJsonApiPayload(instances)
  }

  generateOffsetStatement () {
    const page = this.request.query.page || {}
    return +page.offset || 0
  }

  generateLimitStatement () {
    const page = this.request.query.page || {}
    return +page.limit || 20
  }

  generatePaginationObject (count) {
    const limit = this.generateLimitStatement()
    const offset = this.generateOffsetStatement()
    return {
      count,
      currentOffset: offset,
      currentPage: Math.floor(offset / limit) + 1,
      nextOffset: offset + limit < count ? offset + limit : null,
      prevOffset: offset - limit >= 0 ? offset - limit : null,
      totalPages: Math.ceil(count / limit)
    }
  }

  async generateWhereClause() {
    return this.request.query || {}
  }

  async get() {
    const { count, rows: instances} = await this.model.findAndCountAll({
      where: await this.generateWhereClause()
    })
    instances.pagination = this.generatePaginationObject(count)
    
    return this.serialize(instances)
  }
}

module.exports = BaseDetailController;
