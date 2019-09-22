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
      grade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          isInt: true,
          min: 1,
          max: 10
        }
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
