'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addIndex('questionAttempts', ['examAttemptId', 'questionId'], {
      name: 'idx_questionAttempts_examAttemptId_questionId',
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeIndex(
      'questionAttempts',
      'idx_questionAttempts_examAttemptId_questionId',
    );
  },
};
