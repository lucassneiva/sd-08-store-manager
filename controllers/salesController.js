const salesService = require('../services/salesService');

// const CREATED_STATUS = 201;
const OK_STATUS = 200;

const create = async (req, res) => {
  const sales = req.body;
  const createdSales = await salesService.create(sales);
  return res.status(OK_STATUS).json(createdSales);
};

module.exports = {
  create,
};
