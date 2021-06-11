const productService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.create(name, quantity);
  return res.status(201).send(newProduct);
};

module.exports = {
  create,
};
