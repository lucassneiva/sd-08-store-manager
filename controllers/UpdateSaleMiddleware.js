const { updateSale } = require('../services/Sales');

module.exports = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;
  const { status, response } = await updateSale(id, sales);

  return res.status(status).json(response);
};
