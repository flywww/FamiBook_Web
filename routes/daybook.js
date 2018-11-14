var daybookController = require('../controllers/daybook');
var routes_builder = require('./rest_routes_builder');
var router = routes_builder(daybookController);

module.exports = router;
