const productService = require('../services/productService');

const CREATED_STATUS = 201;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.create(name, quantity);
  return res.status(CREATED_STATUS).send(newProduct);
};

const getAll = async (_req, res) => {
  const allProducts = await productService.getAll();
  return res.status(200).json(allProducts);
};

module.exports = {
  create,
  getAll,
};
