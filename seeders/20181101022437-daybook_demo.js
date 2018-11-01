'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('DayBooks',[{
      name: 'LinHome',
      createdAt: new Date(),
      updatedAt: new Date()
    }],{})
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('DayBooks', null, {});
  }
};
