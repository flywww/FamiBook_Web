
module.exports = function(passport){
  //authenticate
  var bcrypt = require('bcrypt-nodejs');
  var LocalStrategy = require('passport-local').Strategy;
  var models = require('../models');

  //authenticate - login
  passport.serializeUser(function (user, done) {
    console.log(user.id);
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    console.log('deserialzeUser');
    models.User
    .findById(id)
    .then( user => done(null,user))
    .catch( error => done(err,null));
  });

  passport.use('signin', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'account'
  },
    function (req, account, password, done) {
      models.User
      .findOne({'where':{ 'account': account }})
      .then( user => {
        if(!user){
          console.log('can\'t find the user');
          return done(null, false, req.flash('info', 'User not found.'))
        }else{
          //find a user
          console.log('find the user');
          //Encryption
          var isValidPassword = function (user, password) {
            return bcrypt.compareSync(password, user.password)
          }
          if (!isValidPassword(user, password)) {return done(null, false, req.flash('info', 'Invalid password'))}
          return done(null, user)
        }
      })
    }
  ));

  //signup
  passport.use('signup', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'account'
  },
    function (req, account, password, done) {
      var findOrCreateUser = function () {
        models.User
        .findOne({'where':{ 'account': account }})
        .then( user => {
          if(!user){
            //New user
            console.log('new user!');
            models.User
            .create({
              account: account,
              password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
              name: req.params.name
            })
            .then( user => {return done(null, user)} )
            .catch( error => {return done(error)} )
          }else{
            //find a user
            console.log('find a user');
            return done(null, false, req.flash('info', 'User already exists'));
          }
        })
      }
      process.nextTick(findOrCreateUser)
    }));
}
