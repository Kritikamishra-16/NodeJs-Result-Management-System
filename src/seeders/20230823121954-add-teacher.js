'use strict';
const {SALT}= require('../config/serverConfig');
const bcrypt= require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Teachers', [{
         email: 'faculty@gmail.com',
         password: bcrypt.hashSync('Faculty@123', SALT),
         createdAt: new Date(),
         updatedAt: new Date()
       }], {});
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
