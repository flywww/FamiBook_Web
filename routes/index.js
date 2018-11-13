var express = require('express');
var router = express.Router();
var models = require('../models');


// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
});

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

//authenticate



module.exports = router;



// // 在每一個請求被處理之前都會執行的 middleware
// router.use(function(req, res, next) {
//
//   // 輸出記錄訊息至終端機
//   console.log(req.method, req.url);
//
//   // 繼續路由處理
//   next();
// });
//
// // 驗證 :name 的 route middleware
// router.param('name', function(req, res, next, name) {
//   // 在這裡驗證資料
//   // ... ... ...
//
//   // 顯示驗證訊息
//   console.log('doing name validations on ' + name);
//
//   // 當驗證成功時，將其儲存至 req
//   req.name = name;
//
//   // 繼續後續的處理流程
//   next();
// });
