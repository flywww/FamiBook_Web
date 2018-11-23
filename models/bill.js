'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define('Bill', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    date: DataTypes.DATE,
    note: DataTypes.STRING
  }, {});
  Bill.associate = function(models) {
    Bill.belongsTo(models.DayBook, {
      foreignKey: 'daybookId',
      onDelete: 'SET NULL'
    });
    Bill.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'SET NULL'
    });
  };
  return Bill;
};
