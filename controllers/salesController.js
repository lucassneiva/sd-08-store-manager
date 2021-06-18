const salesService = require('../services/salesService');

const error = 422;
const ok = 200;
const notfound = 404;
const negative = -1;

const getAllSales = async (_req, res) => {
  const result = await salesService.getAllSales();
  res.status(ok).json(result);
};

const findSale = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.findSale(id);
  if (result.err) {
    return res.status(notfound).json(result);
  }
  res.status(ok).json(result);
};

const createSale = async (req, res) => {
  const sale = req.body;
  const validation = salesService.validateSale(sale);
  if (validation) {
    res.status(error).json(validation);
  }
  const result = await salesService.createSale(sale);
  await salesService.saleQuantity(sale, negative);
  res.status(ok).json(result);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const validation = salesService.validateSale(sale);
  if (validation) {
    return res.status(error).json(validation);
  }
  const oldSale = await salesService.findSale(id);
  const result = await salesService.updateSale(id, sale);
  await salesService.saleQuantity(oldSale.itensSold, 1);
  await salesService.saleQuantity(sale, negative);
  res.status(ok).json(result);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.findSale(id);
  const result = await salesService.deleteSale(id);
  if (result.err) {
    return res.status(error).json(result);
  }
  await salesService.saleQuantity(sale.itensSold, 1);
  res.status(ok).json(result);
};

module.exports = {
  getAllSales,
  findSale,
  createSale,
  updateSale,
  deleteSale,
};
