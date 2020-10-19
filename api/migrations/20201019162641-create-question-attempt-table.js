'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('questionAttempts', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      examAttemptId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'examAttempts',
          key: 'id'
        }
      },
      questionId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'questions',
          defaultValue: '',
          key: 'id'
        }
      },
      answer: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('questionAttempts');
  }
};
