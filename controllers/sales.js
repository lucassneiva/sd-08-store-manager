const sales = require('../services/sales');

const SUCCESS = 200;
const FAILURE = 422;
const NOT_FOUND = 404;

const addSales = async (req, res) => {
  const itensSold = req.body;
  const registeredSales = await sales.addSales(itensSold);
  if(registeredSales.err) return res.status(FAILURE).json({ err: registeredSales.err });
  return res.status(SUCCESS).json(registeredSales.data);
};

const getSales = async (_req, res) => {
  const result = await sales.getSales();
  return res.status(SUCCESS).json({ sales: result });
};
const getSaleById = async (req, res) => {
  const { id } = req.params;
  const result = await sales.getSaleById(id);
  if(result.err) return res.status(NOT_FOUND).json({ err: result.err });
  return res.status(SUCCESS).json(result);
};

module.exports = {
  addSales,
  getSales,
  getSaleById,
};
