var models = require('../../../models');
var responseBuilder = require('../../../helpers/http_response_helper');
var mainStatus = require('../../../helpers/main_status_code_helper');
const status = require('http-status');
var Op = require("sequelize").Op;


exports.create = (req, res, next) => {
  if(!req.isAuthenticated(req)){
    return res.status(status.BAD_REQUEST)
       .send(responseBuilder(mainStatus.error.unauthorized.code,mainStatus.error.unauthorized.message,null));
  }

  models.Bill
  .create({
    name: req.body.name,
    type: req.body.type,
    amount: req.body.amount,
    date: req.body.date,
    note: req.body.note,
    daybookId: req.body.daybookId,
    category: req.body.category
   })
  .then( bill => {
    return res.status(status.OK)
              .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,bill))
  })
  .catch( error => {
    return res.status(status.BAD_REQUEST)
              .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}))
  });
};

exports.index = (req, res, next) => {
  if(!req.isAuthenticated(req)){
    return res.status(status.BAD_REQUEST)
       .send(responseBuilder(mainStatus.error.unauthorized.code,mainStatus.error.unauthorized.message,null));
  }
  var attribute = {
    where:{
      daybookId:req.user.daybookId
    }
  };
  if(req.query.start && req.query.end){
    attribute.where.date = {[Op.between]:[new Date(req.query.start),new Date(req.query.end)]}
  }
console.log(attribute);
  models.Bill
  .findAll(attribute)
  .then( bills => {
    return res.status(status.OK)
              .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,bills))
     })
  .catch( error => {
    return res.status(status.BAD_REQUEST)
              .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}));
     });
};

exports.show = (req, res, next) => {
  if(!req.isAuthenticated(req)){
    return res.status(status.BAD_REQUEST)
       .send(responseBuilder(mainStatus.error.unauthorized.code,mainStatus.error.unauthorized.message,null));
  }

  models.Bill
  .findByPk(req.params.id)
  .then( bill => {
    if(!bill){
      return res.status(status.NOT_FOUND)
                .send(responseBuilder(mainStatus.error.resourcesNotFound.code,mainStatus.error.resourcesNotFound.message,{}))
    }else if(bill.daybookId != req.user.daybookId){
      return res.status(status.BAD_REQUEST)
                .send(responseBuilder(mainStatus.error.unauthorized.code,mainStatus.error.unauthorized.message,null));
    }else{
        return res.status(status.OK)
                  .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,bill))
    }
  })
  .catch( error => {
    return res.status(status.BAD_REQUEST)
              .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}))
  });

};

exports.update = (req, res, next) => {
  if(!req.isAuthenticated(req)){
    return res.status(status.BAD_REQUEST)
       .send(responseBuilder(mainStatus.error.unauthorized.code,mainStatus.error.unauthorized.message,null));
  }

  models.Bill
  .findByPk(req.params.id)
  .then( bill => {
    if(!bill){
      return res.status(status.NOT_FOUND)
                .send(responseBuilder(mainStatus.error.resourcesNotFound.code,mainStatus.error.resourcesNotFound.message,{}))
    }else if(bill.daybookId != req.user.daybookId){
      return res.status(status.BAD_REQUEST)
                .send(responseBuilder(mainStatus.error.unauthorized.code,mainStatus.error.unauthorized.message,null));
    }else{
      bill.name = req.body.name;
      bill.type = req.body.type;
      bill.amount = req.body.amount;
      bill.date = req.body.date;
      bill.note = req.body.note;
      bill.daybookId = req.body.daybookId;
      bill.category = req.body.category;
      bill.save()
      .then(bill => {
        return res.status(status.OK)
                  .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,bill))
      })
      .catch(error => {
        return res.status(status.BAD_REQUEST)
                  .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}))
      });
    }
})
  .catch( error => {
    return res.status(status.BAD_REQUEST)
              .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}))
     });
};

exports.destroy = (req, res, next) => {
  if(!req.isAuthenticated(req)){
    return res.status(status.BAD_REQUEST)
       .send(responseBuilder(mainStatus.error.unauthorized.code,mainStatus.error.unauthorized.message,null));
  }

  models.Bill
  .findByPk(req.params.id)
  .then((bill) => {
    if(!bill){
      return res.status(status.NOT_FOUND)
                .send(responseBuilder(mainStatus.error.resourcesNotFound.code,mainStatus.error.resourcesNotFound.message,{}))
    }else if(bill.daybookId != req.user.daybookId){
      return res.status(status.BAD_REQUEST)
                .send(responseBuilder(mainStatus.error.unauthorized.code,mainStatus.error.unauthorized.message,null));
    }else{
      bill.destroy({
        where:{id:req.params.id},
        force: true
      }).then( () => {
        return res.status(status.OK)
                  .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,{}));
      }).catch( error => {
        return res.status(status.BAD_REQUEST)
                  .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}))
      });
    }
  })
  .catch( error => {
    return res.status(status.BAD_REQUEST)
              .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}))
  });
};
