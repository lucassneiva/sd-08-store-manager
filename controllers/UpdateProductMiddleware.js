const { updateProduct } = require('../services/Products');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { status, response } = await updateProduct(id, name, quantity);

  return res.status(status).json(response);
};
