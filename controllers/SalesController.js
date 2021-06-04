const { addSales, getAllSales, getOneSale, editSale } = require('../models/SalesModel');
const { results } = require('../services/ErrorMessage');
module.exports = {
  add: async (req, res) => {
    const result = await addSales(req.body);
    res.status(results.ok).json(result);
  },
  getAll: async (req, res) => {
    const result = await getAllSales();
    res.status(results.ok).json(result);
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const result = await getOneSale(id);
    if (result.err !== undefined) {
      return res.status(results.notFound).json(result);
    }
    res.status(results.ok).json(result);
  },
  edit: async (req, res) => {
    const { id } = req.params;
    const result = await editSale(id, req.body);
    res.status(results.ok).json(result);
  },
};
