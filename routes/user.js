var user = require('../controllers/user');
var passport = require('passport');
var express = require('express');
var router = express.Router();


//authenticate route
function authenticated (req, res, next) {
  console.log('authenticated function');
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/users/signin');
}

//Web app
router.post('/signin', passport.authenticate('signin', {
  successRedirect: '/users/home',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

router.get('/signin', function (req, res, next) {
  res.render('signin', { message: req.flash('info') });
});

router.get('/signup', function (req, res, next) {
  res.render('signup', { message: req.flash('info') });
});

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/users/home',
  failureRedirect: '/users/signup',
  failureFlash: true
}));

router.get('/signout', function (req, res, next) {
  req.logout()
  res.redirect('/users/signin')
});

router.get('/home', authenticated, function (req, res, next) {
  res.render('home', { user: req.user })
})

module.exports = router;
