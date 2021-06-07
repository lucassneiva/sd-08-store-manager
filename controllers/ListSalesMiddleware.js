const { listSales } = require('../services/Sales');

module.exports = async (req, res) => {
  const { id } = req.params;
  const {status, response} = await listSales(id);

  return res.status(status).json(response);
};
