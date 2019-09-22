'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_places', {
      user_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
          isInt: true
        }
      },
      place_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
          isInt: true
        }
      },
      created_at: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_places');
  }
};
