exports.create = (req, res, next) => {
  console.log('api create');
  res.json({
			status: "success",
			id: 1
	})
};

exports.read = (req, res, next) => {
  console.log('api read');
  res.send('New');
};

exports.show = (req, res, next) => {
  console.log('api show:',req.params.id);
  res.send('New');
};

exports.update = (req, res, next) => {
  console.log('api upadate:',req.params.id);
  res.send('New');
};

exports.destroy = (req, res, next) => {
  console.log('api delete:',req.params.id);
  res.send('New');
};
