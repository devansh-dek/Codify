'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TestCase extends Model {
    static associate(models) {
      TestCase.belongsTo(models.Problem, {
        foreignKey: 'problemId',
        as: 'problem',
      });
    }
  }

  TestCase.init({
    problemId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    input: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    expectedOutput: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'TestCase', // Ensure consistent naming
  });

  return TestCase;
};
