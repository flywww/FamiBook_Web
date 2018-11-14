var user = require('../../../controllers/api/v1/user');
var passport = require('passport');
var express = require('express');
var router = express.Router();

var responseBuilder = require('../../../helpers/http_response_helper');


//authenticate route
function authenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(200).send(responseBuilder(200,'unauthorized',null))
}

//Web app
router.post('/signin',user.signin);
router.post('/signup',user.signup);
router.get('/signout',user.signout);

router.get('/home', authenticated, function (req, res, next) {
  res.render('home', { user: req.user })
})

module.exports = router;
