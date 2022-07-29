'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('examinations', 'code');
      await queryInterface.removeColumn('examinations', 'type');
      await queryInterface.removeColumn('examinations', 'unlisted');
      await queryInterface.renameColumn('examinations', 'start', 'registrationStart');
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn('examinations', 'code', {
        type: Sequelize.STRING,
        allowNull: false,
      });
      await queryInterface.addColumn('examinations', 'type', {
        type: Sequelize.ENUM(Sequelize.STRING),
        values: ['english', 'vedic-maths', 'abacus'],
        allowNull: false,
      });
      await queryInterface.addColumn('examinations', 'unlisted', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      });
      await queryInterface.renameColumn('examinations', 'registrationStart', 'start');
    });
  },
};
