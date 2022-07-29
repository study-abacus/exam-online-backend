'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('questionAttempts', 'examAttemptId');
      await queryInterface.addColumn('questionAttempts', 'subjectAttemptId', {
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
      await queryInterface.createColumn('questionAttempts', 'examAttemptId', {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'examAttempts',
          key: 'id',
        },
      });
      await queryInterface.removeColumn('questionAttempts', 'subjectAttemptId');
    });
  },
};
