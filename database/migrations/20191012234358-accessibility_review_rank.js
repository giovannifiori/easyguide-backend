'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('review', 'is_accessible', Sequelize.ENUM({
      values: ['NO', 'PARTIALLY', 'YES']
    }), {
      type: Sequelize.TINYINT
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('review', 'is_accessible');
  }
};
