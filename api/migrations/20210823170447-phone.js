'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.addColumn('users', 'phone', {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        validatePhone: function (value) {
          if (!value.match(/[2-9]{2}\d{8}/)) {
            throw new Error('Invalid phone number: ' + value);
          }
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'phone');
  },
};
