'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Questionnaires", [
      {
        question: "Do you have experience with javascript?",
        type: "multiple-choice",
        options: ["Yes", "No"],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: "Are you familiar with project management?",
        type: "multiple-choice",
        options: ["Yes", "No"],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: "What programming languages do you know?",
        type: "text",
        options: Sequelize.literal("ARRAY[]::text[]"),  // 🔧 Fix is here
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Questionnaires", null, {});
  }
};
