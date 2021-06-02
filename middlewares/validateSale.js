const SaleSchema = require('../schema/Sale');

module.exports = (req, _res, next) => {
  const { error } = SaleSchema.validate(req.body);

  if (error) next(error);

  next();
};
