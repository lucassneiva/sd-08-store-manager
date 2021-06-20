const salesService = require('../services/salesService');

// const CREATED_STATUS = 201;
const OK_STATUS = 200;
const NOT_FOUND_STATUS = 404;

const create = async (req, res) => {
  const sales = req.body;
  const createdSales = await salesService.create(sales);
  return res.status(OK_STATUS).json(createdSales);
};

const getAllSales = async (_req, res) => {
  const allSales = await salesService.getAllSales();
  return res.status(OK_STATUS).json(allSales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  if (sale) {
    return res.status(OK_STATUS).json(sale);
  }
  return res.status(NOT_FOUND_STATUS).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  });
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updatedSale = await salesService.updateSale(id, data);
  return res.status(OK_STATUS).json(updatedSale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const deletedSale = salesService.deleteSale(id);
  return res.status(OK_STATUS).json(deletedSale);
};

module.exports = {
  create,
  deleteSale,
  getAllSales,
  getSaleById,
  updateSale,
};
