'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    rollnumber: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: true,
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
      type:DataTypes.STRING,
      allowNull:false
    },
    dob:{
      type:DataTypes.DATEONLY,
      allowNull:false,
      validate: {
        isBefore: {
          args: '2005-01-01',
          msg: 'Date of birth must be before 2003-01-01.',
        },
      },
    },
    score: {
      type:DataTypes.INTEGER,
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
    }
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};