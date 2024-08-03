'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    static associate(models) {
      Submission.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      Submission.belongsTo(models.Problem, {
        foreignKey: 'problemId',
        as: 'problem',
      });
    }
  }

  Submission.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    problemId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Submission"
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    verdict: {
      type: DataTypes.STRING,
      allowNull: true
    },
    output: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Submission',
  });

  return Submission;
};
