module.exports = function(controller,actions){
  var express = require('express');
  var router = express.Router();

  //Web app

  if (!actions){
    router.get('/new', controller.new);
    router.post('/', controller.create);
    router.get('/', controller.index);
    router.get('/:id', controller.show);
    router.get('/:id/edit', controller.edit);
    router.patch('/:id', controller.update);
    router.delete('/:id', controller.destroy);
  }else{
    if(actions.find( element => element == 'new')){
      router.get('/new', controller.new);
    }
    if(actions.find(element => element == 'create')){
      router.post('/', controller.create);
    }
    if(actions.find(element => element == 'index')){
      router.get('/', controller.index);
    }
    if(actions.find(element => element == 'show')){
      router.get('/:id', controller.show);
    }
    if(actions.find(element => element == 'edit')){
      router.get('/:id/edit', controller.edit);
    }
    if(actions.find(element => element == ':id')){
      router.patch('/:id', controller.update);
    }
    if(actions.find(element => element == 'delete')){
      router.delete('/:id', controller.delete);
    }
  }

  return router;
}
