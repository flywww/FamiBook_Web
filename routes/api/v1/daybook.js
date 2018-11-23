var daybookApiController = require('../../../controllers/api/v1/daybook');
var routes_builder = require('../../rest_routes_builder');
var router = routes_builder(daybookApiController,['create','index','show','update','destroy']);

//Web app
router.post('/join',daybookApiController.join);
router.post('/leave',daybookApiController.leave);


module.exports = router;
