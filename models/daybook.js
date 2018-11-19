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

    DayBook.hasMany(models.User, {
      foreignKey: 'daybookId',
      onDelete: 'SET NULL'
    });

    DayBook.hasMany(models.Bill, {
      foreignKey: 'daybookId',
      onDelete: 'SET NULL'
    });

  };
  return DayBook;
};
