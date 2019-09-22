'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('review_item', {
      review_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: 'review_disability_item',
        onDelete: 'CASCADE',
        references: {
          model: 'review',
          key: 'id'
        }
      },
      disability_item_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: 'review_disability_item',
        onDelete: 'RESTRICT',
        references: {
          model: 'disability_item',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('review_item');
  }
};
