const productService = require('../services/products');

const registerProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, response } = await productService.create(name, quantity);

  res.status(status).json(response);
};

module.exports = {
  registerProduct
};
