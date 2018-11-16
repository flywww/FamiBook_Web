'use strict';
module.exports = (sequelize, DataTypes) => {
  const DayBook = sequelize.define('DayBook', {
    name: {
      type:DataTypes.STRING,
      validate:{
        notEmpty: true
      }
    }
  }, {});
  DayBook.associate = function(models) {
    // associations can be defined here
  };
  return DayBook;
};
