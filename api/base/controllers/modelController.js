const BaseController = require('./baseController');

class ModelController extends BaseController {
  model = null;

  generateWhereClause() {
    return {};
  }

  getIncludeModelNames() {
    const req = this.request;
    if (!req || !req.query.include) return [];
    const includedModels = req.query.include.split(',');
    return includedModels;
  }

  getExcludedModelNames() {
    const req = this.request;
    if (!req || !req.query.exclude) return [];

    const excludedModels = req.query.exclude.split(',').map((modelStr) => {
      const [modelName, wildcard] = modelStr.split('.');
      if (wildcard === '*') {
        return {
          name: modelName,
          // exclude this property also
          own: false,
        };
      } else {
        return {
          name: modelName,
          // only exclude its relations
          own: true,
        };
      }
    });

    return excludedModels;
  }

  generateIncludeClause() {
    const includedModels = this.getIncludeModelNames();
    const excludeModels = this.getExcludedModelNames();

    return Object.keys(this.model.associations)
      .map((modelName) => {
        const model = this.model.associations[modelName];
        const exclude = excludeModels.find((el) => el.name === modelName);

        const includeObj = {
          model: model.target,
        };

        if (model.isAliased) {
          includeObj.as = model.as;
        }

        if (exclude) {
          if (exclude.own) {
            // exclude this model as well
            return { model: null };
          } else {
            // exclude its relations only
            return includeObj;
          }
        }

        if (includedModels.includes(modelName)) {
          // make a nested include if users requested this resource
          const innerIncludes = {
            all: true,
          };

          return {
            ...includeObj,
            include: innerIncludes,
          };
        } else {
          return includeObj; // else return just include this one.
        }
      })
      .filter((v) => v.model);
  }
}

module.exports = ModelController;
