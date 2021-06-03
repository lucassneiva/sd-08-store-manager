const saleSchema = require('../schema/sales');

module.exports = (req, _res, next) => {
  const { error } = saleSchema.validate(req.body);

  if (error) next(error);

  next();
};
