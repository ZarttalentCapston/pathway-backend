'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert("Roles", [
    {
      name : "Frontend Developer",
      requiredSkills : ["Javascript", "React", "Css"],
      createdAt : new Date(),
      updatedAt : new Date()
    },

    {
       name : "Project Manager",
      requiredSkills : ["Project Mangement", "Communication", "Leadership"],
      createdAt : new Date(),
      updatedAt : new Date()
    },

    {
       name : "Backend Developer",
      requiredSkills : ["Javascript"],
      createdAt : new Date(),
      updatedAt : new Date()
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {})
  }
};
