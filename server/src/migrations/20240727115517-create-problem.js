'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Problems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      sampleInput: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      sampleOutput: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      difficulty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      constraint: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      explanation: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      inputFormat: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      outputFormat: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Problems');
  }
};