'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        id: 2001,
        name: 'Spiderman',
        createdAt: new Date(),
        updatedAt: new Date(),
        phone: '9818590425',
        verified: true,
        roles: Sequelize.literal(`ARRAY['admin']::"enum_users_roles"[]`),
      },
      {
        id: 2002,
        name: 'Batman',
        createdAt: new Date(),
        updatedAt: new Date(),
        phone: '9818590425',
        verified: true,
        roles: Sequelize.literal(`ARRAY['student']::"enum_users_roles"[]`),
      },
      {
        id: 2003,
        name: 'Superman',
        createdAt: new Date(),
        updatedAt: new Date(),
        phone: '9818590425',
        verified: true,
        roles: Sequelize.literal(`ARRAY['student','admin']::"enum_users_roles"[]`),
      },
      {
        id: 2004,
        name: 'Ant Man',
        createdAt: new Date(),
        updatedAt: new Date(),
        phone: '9818590425',
        verified: true,
        roles: Sequelize.literal(`ARRAY['admin']::"enum_users_roles"[]`),
      },
    ];

    return queryInterface.bulkInsert('users', users);
  },

  down: async (queryInterface, Sequelize) => {},
};
