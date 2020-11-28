'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("ALTER TYPE enum_questions_type ADD VALUE 'mcq';");
  },

  down: async (queryInterface, Sequelize) => {},
};
