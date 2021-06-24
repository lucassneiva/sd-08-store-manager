const productService = require('../services/products');

const registerProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, response } = await productService.create(name, quantity);

  res.status(status).json(response);
};

const listProducts = async (req, res) => {
  const { id } = req.params;
  const { status, response } = await productService.list(id);

  res.status(status).json(response);
};

module.exports = {
  registerProduct,
  listProducts
};
