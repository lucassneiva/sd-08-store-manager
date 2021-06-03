const service = require('../services/saleService');

const OK = 200;

const create = async (req, res, next) => {
  const items = req.body;
  const newSale = await service.create(items);

  if (newSale.error) return next(newSale);

  res.status(OK).json(newSale);
};

const readAll = async (_req, res, _next) => {
  const all = await service.readAll();

  res.status(OK).json({ sales: all });
};

const readById = async (req, res, next) => {
  const { id } = req.params;
  const sale = await service.readById(id);

  if (sale.error) return next(sale);
  
  res.status(OK).json(sale);
};

module.exports = {
  create,
  readAll,
  readById
};