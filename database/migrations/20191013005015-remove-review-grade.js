'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('review', 'grade');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('review', 'grade', {
      type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          isNumeric: true,
          isInt: true,
          min: 0,
          max: 10
        }
    });
  }
};
