'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {}
  }
  Post.init(
    {
      description: DataTypes.STRING,
      photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      userId: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Post',
    },
  );
  return Post;
};
