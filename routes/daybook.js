var daybookController = require('../controllers/daybook');
var routes_builder = require('./rest-routes-builder');
var router = routes_builder(daybookController);

module.exports = router;
