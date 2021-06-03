const SaleSchema = require('../schema/SaleSchema');

const validateSale = (req, res, next) => {
  const itensSold = req.body;
  const quantity = itensSold[0].quantity;
  const validations = SaleSchema.validateSale(quantity);
  if (validations.err) {
    return res.status(validations.code).json({ err: validations.err });
  }
  next();
};

module.exports = {
  validateSale,
};
