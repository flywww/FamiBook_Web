
module.exports = function(passport){
  //authenticate
  var bcrypt = require('bcrypt-nodejs');
  var LocalStrategy = require('passport-local').Strategy;
  var models = require('../models');
  var mainStatus = require('../helpers/main_status_code_helper');
  var vertify = require('../helpers/form_vertify_helper');

  //authenticate - login
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
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
          return done(null, false, mainStatus.error.accountDoesNotExist)
        }else{
          //find a user
          console.log('find the user');
          //Encryption
          var isValidPassword = function (user, password) {
            return bcrypt.compareSync(password, user.password)
          }
          if (!isValidPassword(user, password)) {
            return done(null, false, mainStatus.error.accountPasswordIsNotCorrect)
          }
          return done(null, user, mainStatus.succeed)
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
            if(!vertify.isEmail(account)){
              return done(null, false, mainStatus.error.accountEmailFormatIsNotCorrect);
            }
            if(!vertify.isPassword(password)){
              return done(null, false, mainStatus.error.accountPasswordFormatIsNotCorrect);
            }
            models.User
            .create({
              account: account,
              password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
              name: req.params.name
            })
            .then( user => {return done(null, user, mainStatus.succeed)} )
            .catch( error => {return done(error, false, mainStatus.error.accountCreateFaild)} )
          }else{
            //find a user
            console.log('find a user');
            return done(null, false, mainStatus.error.accountIsAlreadyRegistered);
          }
        })
      }
      process.nextTick(findOrCreateUser)
    }));
}
