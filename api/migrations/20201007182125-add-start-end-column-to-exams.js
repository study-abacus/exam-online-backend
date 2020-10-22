'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('examinations', 'start', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
      queryInterface.addColumn('examinations', 'registrationEnd', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('examinations', 'start'),
      queryInterface.removeColumn('examinations', 'registrationEnd'),
    ]);
  },
};
