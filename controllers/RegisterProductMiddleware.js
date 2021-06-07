const { createProduct } = require('../services/Products');

module.exports = async (req, res) => {
  const { name, quantity } = req.body;
  const {status, response} = await createProduct(name, quantity);

  return res.status(status).json(response);
};
