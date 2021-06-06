const SaleSchema = require('../schemas/SaleSchema');

const validateSale = (request, response, next) => {
  const sale = request.body;

  const { code, message } = SaleSchema.validate(sale);

  if (message) return response.status(code).json({
    err: { code: 'invalid_data', message } });

  next();
};

module.exports = {
  validateSale,
};