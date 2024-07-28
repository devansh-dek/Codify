'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    static associate(models) {
      // Ensure that the model names match exactly
      Vote.belongsTo(models.Blogs, { foreignKey: 'blogId', as: 'blog' });
      Vote.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
    }
  }
  Vote.init({
    voteType: {
      type: DataTypes.ENUM('upvote', 'downvote'),
      allowNull: false
    },
    blogId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Blogs',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.STRING,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Vote',
  });
  return Vote;
};
