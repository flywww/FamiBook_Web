var categoryApiController = require('../../../controllers/api/v1/category');
var routes_builder = require('../../rest_routes_builder');
var router = routes_builder(categoryApiController,['create','index','show','update','destroy']);

module.exports = router;
