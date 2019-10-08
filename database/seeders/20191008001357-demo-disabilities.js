'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'disability',
      [
        {
          name: 'Deficiência física e mobilidade reduzida'
        },
        {
          name: 'Deficiência visual'
        },
        {
          name: 'Deficiência auditiva'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('disability', null, {});
  }
};
