
var models = require('../../../models');
var passport = require('passport');
var responseBuilder = require('../../../helpers/http_response_helper');
var mainStatus = require('../../../helpers/main_status_code_helper');
const status = require('http-status');

exports.signin = (req, res, next) => {
  passport.authenticate('signin',function (err, user, info) {
    switch (info) {
      case mainStatus.succeed:
        req.logIn(user, function(err) {
          if (err) {
            const code = mainStatus.error.accountDeserializeUserFailded.code;
            const message = mainStatus.error.accountDeserializeUserFailded.message;
            return res.status(status.BAD_REQUEST).send(responseBuilder(code,message,user.dataValues));
          }
          return res.status(status.OK).send(responseBuilder(info.code,info.message,user.dataValues));
        });
        break;
      case mainStatus.error.accountDoesNotExist:
        return res.status(status.BAD_REQUEST).send(responseBuilder(info.code,info.message,{}));
        break;
      case mainStatus.error.accountPasswordIsNotCorrect:
        return res.status(status.BAD_REQUEST).send(responseBuilder(info.code,info.message,{}));
        break;
    }
  }) (req, res, next);
};

exports.signup = (req, res, next) => {
  passport.authenticate('signup',function (err, user, info) {
    switch (info) {
      case mainStatus.succeed:
        return res.status(status.OK).send(responseBuilder(info.code,info.message,user.dataValues));
        break;
      case mainStatus.error.accountCreateFaild :
        return res.status(status.BAD_REQUEST).send(responseBuilder(info.code,info.message,{}));
        break;
      case mainStatus.error.accountIsAlreadyRegistered:
        return res.status(status.BAD_REQUEST).send(responseBuilder(info.code,info.message,{}));
        break;
      case mainStatus.error.accountEmailFormatIsNotCorrect:
        return res.status(status.BAD_REQUEST).send(responseBuilder(info.code,info.message,{}));
        break;
        case mainStatus.error.accountPasswordFormatIsNotCorrect:
          return res.status(status.BAD_REQUEST).send(responseBuilder(info.code,info.message,{}));
          break;
    }
  }) (req, res, next);
};

exports.signout = (req, res, next) => {
      var err = req.logout();
      var code = mainStatus.succeed.code ;
      var message = mainStatus.succeed.message;
      if (err){
        code = mainStatus.error.accountSignOutFaild.code;
        message = mainStatus.error.accountSignOutFaild.message;
        return res.status(status.BAD_REQUEST).send(responseBuilder(code,message,{}));
      }
      return res.status(status.OK).send(responseBuilder(code,message,{}));
};

exports.new = (req, res, next) => {
};

exports.create = (req, res, next) => {

};

exports.index = (req, res, next) => {

};

exports.show = (req, res, next) => {

};

exports.edit = (req, res, next) => {

};

exports.update = (req, res, next) => {

};

exports.destroy = (req, res, next) => {

};
