const { listProducts } = require('../services/Products');

module.exports = async (req, res) => {
  const { id } = req.params;
  const {status, response} = await listProducts(id);

  return res.status(status).json(response);
};
