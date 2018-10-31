var express = require('express');
var router = express.Router();
var models = require('../models');


/* GET home page. */
router.get('/', function(req, res, next) {
  models.DayBook.findAll().then(function(daybooks) {
    res.render('index', {
      title: 'daybook test',
      daybooks: daybooks,
    });
  });
  //res.render('index', { title: 'Express' });
});

module.exports = router;