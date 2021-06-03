const ProductSchema = require('../schema/products');

module.exports = (req, _res, next) => {
  const { error } = ProductSchema.validate(req.body);

  if (error) next(error);

  next();
};
