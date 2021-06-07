const { createSale } = require('../services/Sales');

module.exports = async (req, res) => {
  const sales = req.body;

  const { status, response } = await createSale(sales);

  return res.status(status).json(response);
};
