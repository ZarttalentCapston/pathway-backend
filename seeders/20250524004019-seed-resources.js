'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert("Resources", [
    {
      title : "Learn javascript Basics",
      url : "https://www.example.com/learn-javascript",
      skill : "javascript",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title : "React Tutorial",
      url : "https://www.example.com/learn-raect",
      skill : "React",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title : "Project Management 101",
      url : "https://www.example.com/learn-pm",
      skill : "Project Management",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title : "Effective communication",
      url : "https://www.example.com/learn-communication",
      skill : "Communication",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title : "Leadership Training",
      url : "https://www.example.com/learn-learn-leadership",
      skill : "Leadership",
      createdAt : new Date(),
      updatedAt : new Date()
    }
   ])
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete("Resources", null, {})
  }
};
