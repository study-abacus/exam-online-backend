'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('examinations', 'type', {
      type: Sequelize.ENUM(Sequelize.STRING),
      values: ['english', 'vedic-maths', 'abacus'],
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('examinations', 'type');
  },
};
