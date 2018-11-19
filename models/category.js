'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.Bill, {
      foreignKey: 'categoryId',
      onDelete: 'SET NULL'
    });
  };
  return Category;
};
