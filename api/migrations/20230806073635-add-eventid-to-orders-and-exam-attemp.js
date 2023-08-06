'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('orders', 'eventId', {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'events',
          key: 'id',
        },
      }),
      queryInterface.addColumn('examAttempts', 'eventId', {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'events',
          key: 'id',
        },
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('orders', 'eventId'),
      queryInterface.removeColumn('examAttempts', 'eventId'),
    ]);
  },
};
