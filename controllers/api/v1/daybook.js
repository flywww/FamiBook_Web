var models = require('../../../models');

exports.create = (req, res, next) => {
  models.DayBook
  .create({ name: req.body.name })
  .then( daybook => res.status(201).send(daybook))
  .catch( error => res.status(400).send(error));
};

exports.index = (req, res, next) => {
  models.DayBook
  .findAll()
  .then( daybooks => res.status(200).send({data:daybooks}))
  .catch( error => res.status(400).send(error));
};

exports.show = (req, res, next) => {
  models.DayBook
  .findById(req.params.id)
  .then( daybook => {
    if(!daybook){
      res.status(404).send({message: 'DayBook Not Found',})
    }else{
        res.status(200).send({data:daybook})
    }
})
  .catch( error => res.status(400).send(error));
};

exports.update = (req, res, next) => {
  models.DayBook
  .findById(req.params.id)
  .then( daybook => {
    if(!daybook){
      res.status(404).send({message: 'DayBook Not Found',})
    }else{
      daybook.name = req.body.name;
      daybook.save();
      res.status(200).send({data:daybook})
    }
})
  .catch( error => res.status(400).send(error));
};

exports.destroy = (req, res, next) => {
  models.DayBook
  .findById(req.params.id)
  .then((daybook) => {
    if(!daybook){
      res.status(404).send({message: 'DayBook Not Found',})
    }else{
      daybook.destroy({
        where:{id:req.params.id},
        force: true
      });
        res.status(200).send();
    }
  })
  .catch( error => res.status(400).send(error));
};
