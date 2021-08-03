const Sequelize = require('sequelize');
const ModelController = require('./modelController');

class BaseListController extends ModelController {
  model = null;

  _opsMap = {
    $iLike: Sequelize.Op.iLike,
    $gt: Sequelize.Op.gt,
  };
  _processOperations(query) {
    const keyValues = Object.keys(query).map((key) => {
      let newKey = key;
      if (key.startsWith('$')) {
        newKey = this._opsMap[key];
      }

      if (query[key] instanceof Object && !Array.isArray(query[key])) {
        query[key] = this._processOperations(query[key]);
      }

      return {
        [newKey]: query[key],
      };
    });
    return Object.assign({}, ...keyValues);
  }

  async serialize(instances) {
    return this.model.listToJsonApiPayload(instances);
  }

  generateOffsetStatement() {
    const page = this.request.query.page || {};
    return +page.offset || 0;
  }

  generateLimitStatement() {
    const page = this.request.query.page || {};
    return +page.limit || 20;
  }

  generatePaginationObject(count) {
    const limit = this.generateLimitStatement();
    const offset = this.generateOffsetStatement();
    return {
      count,
      currentOffset: offset,
      currentPage: Math.floor(offset / limit) + 1,
      nextOffset: offset + limit < count ? offset + limit : null,
      prevOffset: offset - limit >= 0 ? offset - limit : null,
      totalPages: Math.ceil(count / limit),
    };
  }

  generateWhereClause() {
    const query = this.request.query.filter || {};

    return this._processOperations(query);
  }

  generateOrderClause() {
    return [];
  }

  getObjectsAndCount() {
    return this.model.findAndCountAll({
      where: this.generateWhereClause(),
      include: this.generateIncludeClause(),
      order: this.generateOrderClause(),
    });
  }

  async get() {
    const { count, rows: instances } = await this.getObjectsAndCount();
    instances.pagination = this.generatePaginationObject(count);

    return this.serialize(instances);
  }
}

module.exports = BaseListController;
