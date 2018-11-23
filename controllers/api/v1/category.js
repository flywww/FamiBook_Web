var models = require('../../../models');
var responseBuilder = require('../../../helpers/http_response_helper');
var mainStatus = require('../../../helpers/main_status_code_helper');
const status = require('http-status');


exports.create = (req, res, next) => {

};

exports.index = (req, res, next) => {
  models.Category
  .findAll()
  .then( categories => {
    return res.status(status.OK)
              .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,categories))
     })
  .catch( error => {
    return res.status(status.BAD_REQUEST)
              .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}));
     });
};

exports.show = (req, res, next) => {
  models.Category
  .findByPk(req.params.id)
  .then( category => {
    if(!category){
      return res.status(status.NOT_FOUND)
         .send(responseBuilder(mainStatus.error.resourcesNotFound.code,mainStatus.error.resourcesNotFound.message,{}))
    }else{
      return res.status(status.OK)
                .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,category))
    }
  })
  .catch( error => {
    return res.status(status.BAD_REQUEST)
              .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}))
  });
};

exports.update = (req, res, next) => {

};

exports.destroy = (req, res, next) => {

};
