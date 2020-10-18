'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('profiles', 'teacherId', {
        type: Sequelize.BIGINT,
        references: {
          model: 'teachers',
          key: 'id'
        }
      }),
      queryInterface.addColumn('profiles', 'otherTeacher', {
        type: Sequelize.STRING
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('profiles', 'teacherId'),
      queryInterface.removeColumn('profiles', 'otherTeacher')
    ])
  }
};
