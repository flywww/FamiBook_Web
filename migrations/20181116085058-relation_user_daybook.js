'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
    queryInterface.addColumn('Users', 'daybookId',
      {
          type: Sequelize.INTEGER,
          onDelete: 'SET NULL',
          references:{
            model:'DayBooks',
            key:'id'
        }
      }),

      queryInterface.addColumn('Users', 'dataUpdatedAt',
        {
            type: Sequelize.DATE
        }),

      queryInterface.addColumn('Users', 'role',
        {
            type: Sequelize.STRING
        })
    ]
  },

  down: (queryInterface, Sequelize) => {


    let promise = queryInterface.removeConstraint('Users', 'Users_daybookId_foreign_idx')
      return promise.then( () => { return queryInterface.removeColumn('Users', 'daybookId') })

  }
};
