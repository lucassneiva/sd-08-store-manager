const Sales = require('../services/Sales');

const OK = 200;
const CREATED = 201;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

const add = async (req, res) => {
  const soldItems = req.body;

  const sales = await Sales.add(soldItems);

  if (sales.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(sales);
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

module.exports = {
  add,
  getAll,
  getById,
};
