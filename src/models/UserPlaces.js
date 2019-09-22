'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserPlaces = sequelize.define(
    'UserPlaces',
    {
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
          isInt: true
        }
      },
      place_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
          isInt: true
        }
      }
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: 'user_places',
      modelName: 'UserPlaces'
    }
  );
  UserPlaces.associate = function(models) {
    // associations can be defined here
  };
  return UserPlaces;
};
