'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TestCases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TestCases.belongsTo(models.Problem, {
        foreignKey: 'problemId',
        as: 'problem',
      });
    }
  }
  TestCases.init({
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
    modelName: 'TestCases',
  });
  return TestCases;
};