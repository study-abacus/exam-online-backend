'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const examAttempts = [
      {
        id: 1,
        userId: 2001,
        examinationId: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
        start: new Date(),
        result: JSON.stringify({}),
      },
      {
        id: 2,
        userId: 2002,
        examinationId: 17,
        createdAt: new Date(),
        updatedAt: new Date(),
        start: new Date(),
        result: JSON.stringify({}),
      },
    ];

    return queryInterface.bulkInsert('examAttempts', examAttempts);
  },

  down: async (queryInterface, Sequelize) => {},
};
