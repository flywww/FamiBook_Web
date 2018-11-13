var user = require('../../../controllers/api/v1/user');
var passport = require('passport');
var express = require('express');
var router = express.Router();


//authenticate route
function authenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/users/signin');
}

//Web app
router.post('/signin', passport.authenticate('signin',
  function (err, user, info) {

  }
));

router.post('/signup', passport.authenticate('signup',
  function (err, user, info) {

  }
));

router.get('/signout', function (req, res, next) {
  req.logout()
  res.redirect('/users/signin')
});

router.get('/home', authenticated, function (req, res, next) {
  res.render('home', { user: req.user })
})

module.exports = router;
