const SalesService = require('../services/salesService');

const ok = 200;

const addNewSale = async (req, res, next) => {
  const sale = req.body;
  const result = await SalesService.addNewSale(sale);
  if (result.err) return next(result.err);
  res.status(ok).json(result);
};

module.exports = {
  addNewSale,
};