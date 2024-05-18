'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Correct associations with aliases
      User.belongsToMany(models.User, {
        as: 'Friends',
        through: models.Friendship,
        foreignKey: 'userId',
        otherKey: 'friendId',
      });
      User.belongsToMany(models.User, {
        as: 'FriendOf',
        through: models.Friendship,
        foreignKey: 'friendId',
        otherKey: 'userId',
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
