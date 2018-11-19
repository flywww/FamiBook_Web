'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    account: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {

    User.belongsTo(models.DayBook, {
      foreignKey: 'daybookId',
      onDelete: 'SET NULL'
    });

  };
  return User;
};
