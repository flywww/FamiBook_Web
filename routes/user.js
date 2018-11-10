var user = require('../controllers/user');
var routes_builder = require('./rest-routes-builder');
var router = routes_builder(user);
var passport = require('passport');


//authenticate route
function authenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/signin');
}

//Web app
router.post('/signin', passport.authenticate('signin', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true
}));

router.get('/signin', function (req, res, next) {
  res.render('signin', { message: req.flash('info') });
});

router.get('/signup', function (req, res, next) {
  res.render('signup', { message: req.flash('info') });
});

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/home',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/signout', function (req, res, next) {
  req.logout()
  res.redirect('/')
});

router.get('/home', authenticated, function (req, res, next) {
  res.render('home', { user: req.user })
})

module.exports = router;
