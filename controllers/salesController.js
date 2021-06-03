const {
  createSalesService,
  salesValidation,
  getAllSalesService,
  getByIdSalesService,
} = require('../services/salesService');

const OK = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY= 422;

const createSalesController = async (req, res) => {
  const sales = req.body;
  const validation = salesValidation(sales);
  if (validation.err) return res.status(UNPROCESSABLE_ENTITY).json(validation);
  const create = await createSalesService(sales);
  res.status(OK).json(create);
};

const getAllSalesController = async (req, res) => {
  const sales = await getAllSalesService();
  res.status(OK).json(sales);
};

const getByIdSalesController = async (req, res) => {
  const { id } = req.params;
  const sale = await getByIdSalesService(id);
  if (sale.err) return res.status(NOT_FOUND).json(sale);
  res.status(OK).json(sale);
};

module.exports = {
  createSalesController,
  getAllSalesController,
  getByIdSalesController,
};
