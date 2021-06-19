const salesService = require('../services/salesService');

// const CREATED_STATUS = 201;
const OK_STATUS = 200;

const create = async (req, res) => {
  const sales = req.body;
  const createdSales = await salesService.create(sales);
  return res.status(OK_STATUS).json(createdSales);
};

const getAllSales = async (_req, res) => {
  const allSales = await salesService.getAllSales();
  return res.status(OK_STATUS).json(allSales);
};

module.exports = {
  create,
  getAllSales,
};
