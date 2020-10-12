'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('profiles', 'guardianName', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('profiles', 'contact', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('profiles', 'address', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('profiles', 'city', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('profiles', 'currentCourse', {
        type: Sequelize.ARRAY(Sequelize.STRING)
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('profiles', 'guardianName'),
      queryInterface.removeColumn('profiles', 'contact'),
      queryInterface.removeColumn('profiles', 'address'),
      queryInterface.removeColumn('profiles', 'city'),
      queryInterface.removeColumn('profiles', 'currentCourse')
    ])
  }
};
