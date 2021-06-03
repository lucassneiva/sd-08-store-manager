const { addSales } = require('../models/SalesModel');
const { results } = require('../services/ErrorMessage');
module.exports = {
  add: async (req, res) => {
    const result = await addSales(req.body);
    res.status(results.ok).json(result);
  },
};
