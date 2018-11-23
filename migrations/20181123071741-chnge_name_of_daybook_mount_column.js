'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.renameColumn('Bills', 'mount' , 'amount');
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.renameColumn('Bills', 'amount' , 'mount');
  }
};
