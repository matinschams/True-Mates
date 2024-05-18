'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Friendship extends Model {
    static associate(models) {
      Friendship.belongsTo(models.User, { as: 'User', foreignKey: 'userId' });
      Friendship.belongsTo(models.User, {
        as: 'Friend',
        foreignKey: 'friendId',
      });
    }
  }
  Friendship.init(
    {
      userId: DataTypes.INTEGER,
      friendId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Friendship',
    },
  );
  return Friendship;
};
