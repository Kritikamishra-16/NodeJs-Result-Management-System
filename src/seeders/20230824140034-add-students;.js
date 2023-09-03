'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Students', [{
        rollnumber:1,
        name: 'Kritika Mishra',
        dob: '2001-08-16',// Format: YYYY-MM-DD
        score: 90,
        createdAt: new Date(),
        updatedAt: new Date(),

      },{
        rollnumber:2,
        name: 'Kartikey Mishra',
        dob: '2001-10-25',// Format: YYYY-MM-DD
        score: 97,
        createdAt: new Date(),
        updatedAt: new Date(),

      },{
        rollnumber:3,
        name: 'Sonia Singh',
        dob: '2000-01-25',// Format: YYYY-MM-DD
        score: 88,
        createdAt: new Date(),
        updatedAt: new Date(),

      },{
        rollnumber:4,
        name: 'Shipra Rai',
        dob: '2001-12-25',// Format: YYYY-MM-DD
        score: 92,
        createdAt: new Date(),
        updatedAt: new Date(),

      },{
        rollnumber:5,
        name: 'Shlok Mehta',
        dob: '2002-10-21',// Format: YYYY-MM-DD
        score: 60,
        createdAt: new Date(),
        updatedAt: new Date(),

      },{
        rollnumber:6,
        name: 'Darsh Tripathi',
        dob: '2002-11-25',// Format: YYYY-MM-DD
        score: 66,
        createdAt: new Date(),
        updatedAt: new Date(),

      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
