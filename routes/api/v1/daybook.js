var daybookApiController = require('../../../controllers/api/v1/daybook');
var routes_builder = require('../../rest-routes-builder');
var router = routes_builder(daybookApiController,['create','index','show','update','destroy']);

module.exports = router;
