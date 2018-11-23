var billApiController = require('../../../controllers/api/v1/bill');
var routes_builder = require('../../rest_routes_builder');
var router = routes_builder(billApiController,['create','index','show','update','destroy']);

module.exports = router;
