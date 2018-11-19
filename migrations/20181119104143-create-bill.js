'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mount: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      note: {
        type: Sequelize.STRING
      },
      daybookId:{
        type: Sequelize.UUID,
        onDelete: 'SET NULL',
        references:{
          model:'DayBooks',
          key:'id'
        }
      },
      categoryId:{
        type: Sequelize.UUID,
        onDelete: 'SET NULL',
        references:{
          model:'Categorys',
          key:'id'
        }
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bills');
  }
};
