'use strict';
const { ROLES_TYPES } = require('../constants/roles');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'roles', {
      type: Sequelize.ARRAY(Sequelize.ENUM(ROLES_TYPES)),
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'roles');
  },
};
