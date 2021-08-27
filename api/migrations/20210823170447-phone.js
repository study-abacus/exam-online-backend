'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'phone', {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        validatePhone: function (value) {
          if (!/^(+d{1,2}s)?(?d{3})?[s.-]d{3}[s.-]d{4}$/i.test(value)) {
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
