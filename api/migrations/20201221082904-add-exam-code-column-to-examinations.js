'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(
        'examinations',
        'code',
        {
          type: Sequelize.STRING,
        },
        { transaction },
      );
      await queryInterface.sequelize.query(
        `
        UPDATE examinations SET code = description;
      `,
        { transaction },
      );
      await queryInterface.changeColumn(
        'examinations',
        'code',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction },
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('examinations', 'code');
  },
};
