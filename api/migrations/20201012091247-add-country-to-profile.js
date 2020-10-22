'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('profiles', 'country', {
      type: Sequelize.STRING,
      defaultValue: 'India',
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('profiles', 'country');
  },
};
