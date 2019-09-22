'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReviewItem = sequelize.define(
    'ReviewItem',
    {
      review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Review',
          key: 'id'
        }
      },
      disability_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'DisabilityItem',
          key: 'id'
        }
      }
    },
    {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
      tableName: 'review_item'
    }
  );
  ReviewItem.associate = function(models) {
    // associations can be defined here
  };
  return ReviewItem;
};
