const Sales = require('../services/Sales');

const OK = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

const add = async (req, res) => {
  const itensSold = req.body;

  const sales = await Sales.add(itensSold);

  if (sales.err) {
    return sales.err.code === 'stock_problem'
      ? res.status(NOT_FOUND).json(sales)
      : res.status(UNPROCESSABLE_ENTITY).json(sales);
  }

  return res.status(OK).json(sales);
};

const getAll = async (_req, res) => {
  const sales = await Sales.getAll();

  return res.status(OK).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const sales = await Sales.getById(id);

  if (sales.err) return res.status(NOT_FOUND).json(sales);

  return res.status(OK).json(sales);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const updatedSale = req.body;
  const sale = await Sales.updateById(id, updatedSale);

  if (sale.err) return res.status(UNPROCESSABLE_ENTITY).json(sale);

  return res.status(OK).json(sale);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const sale = await Sales.deleteById(id);

  if (sale.err) return res.status(UNPROCESSABLE_ENTITY).json(sale);

  return res.status(OK).json(sale);
};

module.exports = {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
};
