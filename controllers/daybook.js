
var models = require('../models');

exports.new = (req, res, next) => {
  console.log('new');
  res.send('New');
};

exports.create = (req, res, next) => {
  models.DayBook.create({ name: req.body.name }).then(function() {
    res.redirect('/');
  });
};

exports.read = (req, res, next) => {
  console.log('read');
  res.send('Read');
};

exports.show = (req, res, next) => {
  console.log('show:',req.params.id);
  res.send('show');
};

exports.edit = (req, res, next) => {
  console.log('edit:',req.params.id);
  res.json({
      status: "success",
      id: 1
  });
};

exports.update = (req, res, next) => {
  console.log('upadate:',req.params.id);
  res.send('update');
};

exports.destroy = (req, res, next) => {
  console.log('delete:',req.params.id);
  res.send('destroy');
};
