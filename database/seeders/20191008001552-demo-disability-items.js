'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'disability_item',
      [
        {
          name: 'Estacionamento exclusivo ou preferencial',
          disability_id: 1
        },
        {
          name: 'Entrada adaptada',
          disability_id: 1
        },
        {
          name: 'Circulação interna',
          disability_id: 1
        },
        {
          name: 'Banheiro(s) adaptado(s)',
          disability_id: 1
        },
        {
          name: 'Elevador(es)',
          disability_id: 1
        },
        {
          name: 'Guias',
          disability_id: 2
        },
        {
          name: 'Sinalizações em braile',
          disability_id: 2
        },
        {
          name: 'Piso tátil',
          disability_id: 2
        },
        {
          name: 'Comunicação em Libras',
          disability_id: 3
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('disability_item', null, {});
  }
};
