const Sales = require('../services/Sales');

const STATUS_CODE_OK = 200;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_UNPROCESSABLE_ENTITY  = 404;
const STATUS_CODE_ERROR = 422;

const getAll = async (_req, res) => {
  const products = await Sales.getAll();
  res.status(STATUS_CODE_OK).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await Sales.getById(id);
  if (sale.err) return res.status(STATUS_CODE_UNPROCESSABLE_ENTITY).json(sale);
  res.status(STATUS_CODE_OK).json(sale);
};

const create = async (req, res) => {
  const salesList = req.body;
  const sales = await Sales.create(salesList);
  if (sales.err) return res.status(STATUS_CODE_ERROR).json(sales);
  // if (sales.err && sales.err.code === 'stock_problem') return res
  //   .status(STATUS_CODE_NOT_FOUND).json(sales);
  res.status(STATUS_CODE_OK).json(sales); 
};

const update = async (req, res) => {
  const updatedSale = req.body;
  const { id } = req.params;
  const sale = await Sales.update(id, updatedSale);
  if (sale.err) return res.status(STATUS_CODE_ERROR).json(sale);
  res.status(STATUS_CODE_OK).json(sale);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const deletedSale = await Sales.remove(id);
  if (deletedSale.err) return res.status(STATUS_CODE_ERROR).json(deletedSale);
  res.status(STATUS_CODE_OK).json(deletedSale);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};