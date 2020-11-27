'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addIndex('examAttempts', ['userId', 'examinationId'], {
      unique: true,
      name: 'idx_examAttempts_userId_examinationId',
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('examAttempts', 'idx_examAttempts_userId_examinationId');
  },
};
