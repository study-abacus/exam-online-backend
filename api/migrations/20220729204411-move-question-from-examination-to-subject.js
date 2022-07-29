'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('questions', 'examinationId');
      await queryInterface.addColumn('questions', 'subjectId', {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'subjects',
          key: 'id',
        },
      });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('questions', 'subjectId');
      await queryInterface.addColumn('questions', 'examinationId', {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'examinations',
          key: 'id',
        },
      });
    });
  },
};
