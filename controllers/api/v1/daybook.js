var models = require('../../../models');
var responseBuilder = require('../../../helpers/http_response_helper');
var mainStatus = require('../../../helpers/main_status_code_helper');
const status = require('http-status');

exports.create = (req, res, next) => {
  models.DayBook
  .create({ name: req.body.name })
  .then( daybook => {
    res.status(status.OK)
       .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,daybook))
  })
  .catch( error => {
    res.status(status.BAD_REQUEST)
       .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}))
  });
};

exports.index = (req, res, next) => {
  models.DayBook
  .findAll()
  .then( daybooks => {
    res.status(status.OK)
       .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,daybooks))
     })
  .catch( error => {
    res.status(status.BAD_REQUEST)
       .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}));
     });
};

exports.show = (req, res, next) => {
  models.DayBook
  .findByPk(req.params.id)
  .then( daybook => {
    if(!daybook){
      res.status(status.NOT_FOUND)
         .send(responseBuilder(mainStatus.error.resourcesNotFound.code,mainStatus.error.resourcesNotFound.message,{}))
    }else{
        res.status(status.OK)
           .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,daybook))
    }
  })
  .catch( error => {
    res.status(status.BAD_REQUEST)
       .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}))
  });
};

exports.update = (req, res, next) => {
  models.DayBook
  .findByPk(req.params.id)
  .then( daybook => {
    if(!daybook){
      res.status(status.NOT_FOUND)
         .send(responseBuilder(mainStatus.error.resourcesNotFound.code,mainStatus.error.resourcesNotFound.message,{}))
    }else{
      daybook.name = req.body.name;
      daybook.save()
      .then(daybook => {
        res.status(status.OK)
           .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,daybook))
      })
      .catch(error => {
        res.status(status.BAD_REQUEST)
           .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}))
      });
    }
})
  .catch( error => {
    res.status(status.BAD_REQUEST)
       .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}))
     });
};

exports.destroy = (req, res, next) => {
  models.DayBook
  .findByPk(req.params.id)
  .then((daybook) => {
    if(!daybook){
      res.status(status.NOT_FOUND)
         .send(responseBuilder(mainStatus.error.resourcesNotFound.code,mainStatus.error.resourcesNotFound.message,{}))
    }else{
      daybook.destroy({
        where:{id:req.params.id},
        force: true
      }).then( () => {
        res.status(status.OK)
           .send(responseBuilder(mainStatus.succeed.code,mainStatus.succeed.message,{}));
      }).catch( error => {
        res.status(status.BAD_REQUEST)
           .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}))
      });
    }
  })
  .catch( error => {
    res.status(status.BAD_REQUEST)
       .send(responseBuilder(mainStatus.error.systemError.code,error.errors[0].message,{}))
  });
};
