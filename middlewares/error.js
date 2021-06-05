const boom = require('boom');
const STATUS_500 = 500;

module.exports = (err, _req, res, _next) => {
  console.log(err);

  if(boom.isBoom(err)) {
    return res.status(err.output.statusCode).json(err.output.payload);
  };

  res.status(STATUS_500).json({ message: err.message });
};
