'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Bills', 'daybookId',
      {
          type: Sequelize.INTEGER,
          onDelete: 'SET NULL',
          references:{
            model:'DayBooks',
            key:'id'
        }
      }),
      queryInterface.addColumn('Bills', 'categoryId',
        {
            type: Sequelize.INTEGER,
            onDelete: 'SET NULL',
            references:{
              model:'Categories',
              key:'id'
          }
        })
  },

  down: (queryInterface, Sequelize) => {
    // let promiseForDaybooksConstraint = queryInterface.removeConstraint('Bills', 'Bills_daybookId_foreign_idx')
    // let promiseForDaybookId = queryInterface.removeColumn('Bills', 'daybookId')
    // let promiseForCategorysConstraint = queryInterface.removeConstraint('Bills', 'Bills_categoryId_foreign_idx')
    // let promiseForCategoryId = queryInterface.removeColumn('Bills', 'categoryId')
    //
    // return promiseForDaybooksConstraint
    //       .then(() => { return promiseForDaybookId
    //         .then(() => { return promiseForCategorysConstraint
    //           .then( () => { return promiseForCategoryId })})})


    //return promiseForDaybookId.then(()=>{return promiseForCategoryId})
  }

};
