'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(
        'users',
        'username',
        {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'profiles',
        'email',
        {
          type: DataTypes.STRING,
          validate: {
            isEmail: true,
          },
          allowNull: true,
        },
        { transaction },
      );
      await queryInterface.removeColumn('users', 'email', { transaction });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('users', 'username');
      await queryInterface.removeColumn('profile', 'email');
    });
  },
};
