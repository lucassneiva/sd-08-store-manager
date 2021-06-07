const rescue = require('express-rescue');
const Sale = require('../services/Sale');

const HTTP_OK = 200;
// const HTTP_Created = 201;

const getAll = rescue(async (req, res) => {
  const sales = await Sale.getAll();

  res.status(HTTP_OK).json(sales);
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const saleID = await Sale.findById(id);

  if (saleID.error) return next(saleID);

  res.status(HTTP_OK).json(saleID);
});

const create = rescue(async (req, res, next) => {
  const items = req.body;

  const newSale = await Sale.create(items);

  if (newSale.error) return next(newSale);

  res.status(HTTP_OK).json(newSale);
});

const update = rescue(async (req, res, next) => {
  const items = req.body;
  const { id } = req.params;

  const updateSale = await Sale.update(id, items);

  if (updateSale.error) return next(updateSale);

  res.status(HTTP_OK).json(updateSale);
});

const exclude = rescue(async (req, res, next) => {
  const { id } = req.params;

  const excludeSale = await Sale.exclude(id);

  if (excludeSale.error) return next(excludeSale);

  res.status(HTTP_OK).json(excludeSale);
});

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};