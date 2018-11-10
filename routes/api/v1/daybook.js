var express = require('express');
var router = express.Router();
var models = require('../../../models');
var daybook_api = require('../../../controllers/api/v1/daybook');

//Api
router.post('/api/v1/daybooks', daybook_api.create);
router.get('/api/v1/daybooks', daybook_api.index);
router.get('/api/v1/daybooks/:id', daybook_api.show);
router.patch('/api/v1/daybooks/:id', daybook_api.update);
router.delete('/api/v1/daybooks/:id', daybook_api.destroy);

module.exports = router;
