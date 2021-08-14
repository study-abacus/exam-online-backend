'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('examAttempts', 'certificate', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('examAttempts', 'certificate');
  },
};
