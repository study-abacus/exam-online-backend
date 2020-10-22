const R = require('ramda');

const removeNonEditableAttrs = (attrs, obj) => R.pickBy((attr) => !attrs.includes(attr), obj);

module.exports = {
  removeNonEditableAttrs,
};
