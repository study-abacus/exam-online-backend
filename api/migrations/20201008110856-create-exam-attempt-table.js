'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('examAttempts', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      start: {
        type: Sequelize.DATE,
        allowNull: false
      },
      isSubmitted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      result: {
        type: Sequelize.JSON
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      examinationId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'examinations',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('examAttempts')
  }
};
