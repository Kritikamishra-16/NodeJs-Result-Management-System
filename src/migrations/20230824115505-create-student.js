'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rollnumber: {
        type: Sequelize.STRING,
        unique: true,
        allowNull:false,
        validate: {
        isInt: {
          args: true,
          msg: 'Roll number must be an integer.',
        },
        min: {
          args: 1,
          msg: 'Roll number must be greater than or equal to 1.',
        },
        max: {
          args: 1000,
          msg: 'Roll number must be less than or equal to 1000.',
        },
      },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull:false,
        validate: {
        isBefore: {
          args: new Date('2005-01-01'),
          msg: 'Date of birth must be before 2003-01-01.',
        },
      },
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate: {
        isInt: {
          args: true,
          msg: 'Score must be an integer.',
        },
        min: {
          args: 1,
          msg: 'Score must be greater than or equal to 1.',
        },
        max: {
          args: 100,
          msg: 'Score must be less than or equal to 100.',
        },
      },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  }
};