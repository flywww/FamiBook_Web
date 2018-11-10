var daybook = require('../controllers/daybook');
var routes_builder = require('./rest-routes-builder');
var router = routes_builder(daybook);

module.exports = router;
