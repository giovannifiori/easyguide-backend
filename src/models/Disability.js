'use strict';
module.exports = (sequelize, DataTypes) => {
  const Disability = sequelize.define(
    'Disability',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlpha: true
        }
      }
    },
    {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
      tableName: 'disability',
      modelName: 'Disability'
    }
  );
  Disability.associate = function(models) {
    // associations can be defined here
    models.Disability.hasMany(models.DisabilityItem, {
      as: 'items',
      foreignKey: 'disability_id'
    });
  };
  return Disability;
};
