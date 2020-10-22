'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('questions', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        defaultValue: '',
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('number', 'text', 'paragraph'),
        defaultValue: 'number',
        allowNull: false
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
    return queryInterface.dropTable('questions');
  }
};
