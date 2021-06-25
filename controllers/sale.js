const Sale = require('../services/sale');

const status = 200;

const create = async (req, res, next) => {
  const items = req.body;
  const sale = await Sale.create(items);

  if (sale.error) return next(sale);

  res.status(status).json(sale);
};

const getAll = async (_req, res, _next) => {
  const all = await Sale.getAll();

  res.status(status).json({ sales: all });
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const sale = await Sale.getById(id);

  if (sale.error) return next(sale);

  res.status(status).json(sale);
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const  name  = req.body;
  const uptadeSale = await Sale.update(id, name);

  if (uptadeSale.error) return next(uptadeSale);

  res.status(status).json(uptadeSale);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;

  const sale = await Sale.deleteById(id);

  if (sale.error) {
    return next(sale);
  }

  return res.status(status).json(sale);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById
};