'use strict';
module.exports = (sequelize, DataTypes) => {
  const DayBook = sequelize.define('DayBook', {
    name: DataTypes.STRING
  }, {});
  DayBook.associate = function(models) {
    // associations can be defined here
  };
  return DayBook;
};