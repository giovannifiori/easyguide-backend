'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      text: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      place_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      is_accessible: {
        type: DataTypes.ENUM({
          values: ['NO', 'PARTIALLY', 'YES']
        }),
        allowNull: false
      }
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: 'review',
      modelName: 'Review'
    }
  );
  Review.associate = function(models) {
    // associations can be defined here
    models.Review.belongsToMany(models.DisabilityItem, {
      through: models.ReviewItem,
      foreignKey: 'review_id',
      as: 'reviewItems'
    });
  };
  return Review;
};
