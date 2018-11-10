module.exports = function(controller){
  var express = require('express');
  var router = express.Router();

  //Web app
  router.get('/new', controller.new);
  router.post('/', controller.create);
  router.get('/', controller.index);
  router.get('/:id', controller.show);
  router.get('/:id/edit', controller.edit);
  router.patch('/:id', controller.update);
  router.delete('/:id', controller.destroy);

  return router;
}
