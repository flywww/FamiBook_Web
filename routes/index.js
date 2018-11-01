var express = require('express');
var router = express.Router();
var models = require('../models');
var daybook = require('../controllers/daybook');
var daybook_api = require('../controllers/api/daybook');

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

//daybooks route
//Web app
router.get('/daybooks/new', daybook.new);
router.post('/daybooks', daybook.create);
router.get('/daybooks', daybook.read);
router.get('/daybooks/:id', daybook.show);
router.get('/daybooks/:id/edit', daybook.edit);
router.patch('/daybooks/:id', daybook.update);
router.delete('/daybooks/:id', daybook.destroy);
//Api
router.post('/api/v1/daybooks', daybook_api.create);
router.get('/api/v1/daybooks', daybook_api.read);
router.get('/api/v1/daybooks/:id', daybook_api.show);
router.patch('/api/v1/daybooks/:id', daybook_api.update);
router.delete('/api/v1/daybooks/:id', daybook_api.destroy);

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
