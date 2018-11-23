var models = require('../../../models');
var responseBuilder = require('../../../helpers/http_response_helper');
var mainStatus = require('../../../helpers/main_status_code_helper');
const status = require('http-status');

//check user has a daybool?
exports.create = (req, res, next) => {
  if(!req.isAuthenticated(req)){
    return res.status(status.BAD_REQUEST)
       .send(responseBuilder(mainStatus.error.unauthorized.code,mainStatus.error.unauthorized.message,null));
  }
  models.DayBook
  .findOne({where:{name: req.body.name}})
  .then((daybook)=>{
    if(daybook){
      return res.status(status.BAD_REQUEST)
         .send(responseBuilder(mainStatus.error.daybookHasAlreadyExist.code,mainStatus.error.daybookHasAlreadyExist.message,null));
    }else{
      models.DayBook
      .create({ name: req.body.name })
      .then( daybook => {
        return res.status(status.OK)
                  .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,daybook))
      })
      .catch( error => {
        return res.status(status.BAD_REQUEST)
                  .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}))
      });
    }
  })
};

exports.index = (req, res, next) => {
  if(!req.isAuthenticated(req)){
    return res.status(status.BAD_REQUEST)
       .send(responseBuilder(mainStatus.error.unauthorized.code,mainStatus.error.unauthorized.message,null));
  }
  models.DayBook
  .findAll()
  .then( daybooks => {
    return res.status(status.OK)
              .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,daybooks))
     })
  .catch( error => {
    return res.status(status.BAD_REQUEST)
              .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}));
     });
};

exports.show = (req, res, next) => {
  if(!req.isAuthenticated(req) ||(req.user.daybookId != req.params.id)){
    return res.status(status.BAD_REQUEST)
       .send(responseBuilder(mainStatus.error.unauthorized.code,mainStatus.error.unauthorized.message,null));
  }

  models.DayBook
  .findByPk(req.params.id)
  .then( daybook => {
    if(!daybook){
      return res.status(status.NOT_FOUND)
         .send(responseBuilder(mainStatus.error.resourcesNotFound.code,mainStatus.error.resourcesNotFound.message,{}))
    }else{
      return res.status(status.OK)
                .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,daybook))
    }
  })
  .catch( error => {
    return res.status(status.BAD_REQUEST)
              .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}))
  });
};

exports.update = (req, res, next) => {
  if(!req.isAuthenticated(req) ||(req.user.daybookId != req.params.id)){
    return res.status(status.BAD_REQUEST)
       .send(responseBuilder(mainStatus.error.unauthorized.code,mainStatus.error.unauthorized.message,null));
  }
  models.DayBook
  .findByPk(req.params.id)
  .then( daybook => {
    if(!daybook){
      return res.status(status.NOT_FOUND)
                .send(responseBuilder(mainStatus.error.resourcesNotFound.code,mainStatus.error.resourcesNotFound.message,{}))
    }else{
      daybook.name = req.body.name;
      daybook.save()
      .then(daybook => {
        return res.status(status.OK)
                  .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,daybook))
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
  if(!req.isAuthenticated(req) ||(req.user.daybookId != req.params.id)){
    return res.status(status.BAD_REQUEST)
       .send(responseBuilder(mainStatus.error.unauthorized.code,mainStatus.error.unauthorized.message,null));
  }
  models.DayBook
  .findByPk(req.params.id)
  .then((daybook) => {
    if(!daybook){
      return res.status(status.NOT_FOUND)
                .send(responseBuilder(mainStatus.error.resourcesNotFound.code,mainStatus.error.resourcesNotFound.message,{}))
    }
    daybook.destroy({
      where:{id:req.params.id},
      force: true
    }).then( () => {
      return res.status(status.OK)
                .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,{}));
    }).catch( error => {
      return res.status(status.BAD_REQUEST)
                .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}))
    });
  })
  .catch( error => {
    return res.status(status.BAD_REQUEST)
              .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}))
  });
};

exports.join = (req, res, next) => {
  models.DayBook
  .findOne({
    where:{
      name: req.body.name,
      id: req.body.id
    }
  })
  .then((daybook) => {
    if(!daybook){
      return res.status(status.NOT_FOUND)
                .send(responseBuilder(mainStatus.error.resourcesNotFound.code,mainStatus.error.resourcesNotFound.message,{}))
    }
    req.user.daybookId = req.body.id;
    req.user.save();
    return res.status(status.OK)
              .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,{}));
  })
  .catch((error) => {
    return res.status(status.BAD_REQUEST)
              .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}))
  })
}

exports.leave = (req, res, next) => {
  if(!req.user.daybookId){
    return res.status(status.NOT_FOUND)
              .send(responseBuilder(mainStatus.error.resourcesNotFound.code,mainStatus.error.resourcesNotFound.message,{}))
  }
  req.user.daybookId = null;
  req.user.save();
  return res.status(status.OK)
            .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,{}));
}
