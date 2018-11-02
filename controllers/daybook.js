
//TODO - There's a 404 error when delete by web api

var models = require('../models');

exports.new = (req, res, next) => {
  console.log('new');
  res.send('New');//render new page
};

exports.create = (req, res, next) => {
  models.DayBook
  .create({ name: req.body.name })
  .then( daybook => res.redirect('/'))
  .catch( error => res.status(400).send(error));
};

exports.index = (req, res, next) => {
  models.DayBook
  .findAll()
  .then( daybooks => {
      res.status(200);
      res.render('index', {
        title: 'daybook name',
        daybooks: daybooks
      });
  })
  .catch( error => res.status(400).send(error));
};

exports.show = (req, res, next) => {
  models.DayBook
  .findById(req.params.id)
  .then( daybook => {
    if(!daybook){
      res.status(404).send({message: 'DayBook Not Found',})
    }else{
        res.status(200);
        res.render('index', {
          title: 'daybook name',
          daybooks: [daybook]
        });
    }
  })
  .catch( error => res.status(400).send(error));
};

exports.edit = (req, res, next) => {

};

exports.update = (req, res, next) => {
     models.DayBook
    .findById(req.params.id)
    .then( daybook => {
      if(!daybook){
        res.status(404);
        res.redirect('/');
      }else{
        daybook.name = req.body.name;
        daybook.save();
        res.status(200);
        res.redirect('/');
      }
  })
    .catch( error => res.status(400).send(error));
};

exports.destroy = (req, res, next) => {
  models.DayBook
  .findById(req.params.id)
  .then((daybook) => {
    if(!daybook){
      res.status(404).send();
    }else{
      daybook.destroy({
        where:{id:req.params.id},
        force: true
      })
      .then(() => res.status(200).send());
    }
  })
  .catch( error => res.status(400).send(error));
};
