var models = require('../../models');

exports.create = (req, res, next) => {
  models.DayBook.create({ name: req.body.name })
  .then((daybook) =>res.status(201).send(daybook))
  .catch((error) => res.status(400).send(error));
};

exports.read = (req, res, next) => {
  console.log('api read');
  res.json({
      status: "success",
      id: 1
  })
};

exports.show = (req, res, next) => {
  console.log('api show:',req.params.id);
  res.json({
      status: "success",
      id: 1
  })
};

exports.update = (req, res, next) => {
  console.log('api upadate:',req.params.id);
  res.json({
      status: "success",
      id: 1
  })
};

exports.destroy = (req, res, next) => {
  console.log('api delete:',req.params.id);
  res.json({
      status: "success",
      id: 1
  })
};
