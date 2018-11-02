
var models = require('../models');

exports.new = (req, res, next) => {
  console.log('new');
  res.send('New');//render new page
};

exports.create = (req, res, next) => {
  models.DayBook
  .create({ name: req.body.name })
  .then( daybook => {
    res.redirect('/');
  })
  .catch( error => res.status(400).send(error));
};

exports.index = (req, res, next) => {
  models.DayBook
  .findAll()
  .then( daybooks => {
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
    res.render('index', {
      title: 'daybook name',
      daybooks: [daybook]
    });
  })
  .catch( error => res.status(400).send(error));
};

exports.edit = (req, res, next) => {

};

exports.update = (req, res, next) => {
  console.log('upadate:',req.params.id);
  res.send('update');
};

exports.destroy = (req, res, next) => {
  console.log('delete:',req.params.id);
  res.send('destroy');
};
