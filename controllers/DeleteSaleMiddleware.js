const { deleteSale } = require('../services/Sales');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { status, response } = await deleteSale(id);

  return res.status(status).json(response);
};
