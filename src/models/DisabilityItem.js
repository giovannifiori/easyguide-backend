'use strict';
module.exports = (sequelize, DataTypes) => {
  const DisabilityItem = sequelize.define(
    'DisabilityItem',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlphanumeric: true
        }
      }
    },
    {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
      tableName: 'disability_item',
      modelName: 'DisabilityItem'
    }
  );
  DisabilityItem.associate = function(models) {
    // associations can be defined here
    models.DisabilityItem.belongsTo(models.Disability, {
      onDelete: 'CASCADE',
      foreignKey: 'disability_id'
    });
    models.DisabilityItem.belongsToMany(models.Review, {
      through: models.ReviewItem,
      foreignKey: 'disability_item_id',
      as: 'reviews'
    });
  };
  return DisabilityItem;
};
