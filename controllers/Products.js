const Products = require('../services/Products');

const code = {
  OK: 200,
  created: 201,
  unprocessable_entity: 422,
};

const getAll = async (_req, res) => {
  const products = await Products.getAll();

  res.status(code.OK).json({ products });
};

const findById = async (req, res) => {
  const { id } = req.params;
  
  const findProduct = await Products.findById(id);
  if (findProduct.err) return res.status(code.unprocessable_entity).json(findProduct);
  res.status(code.OK).json(findProduct);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updateProduct = await Products.updateProduct(id, name, quantity);
  res.status(code.OK).json(updateProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deleteProduct = await Products.deleteProduct(id);
  if (deleteProduct.err) return res.status(code.unprocessable_entity).json(deleteProduct);
  res.status(code.OK).json(deleteProduct);
};

const newProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const addNewProduct = await Products.newProduct(name, quantity);
  if (addNewProduct.err) return res.status(code.unprocessable_entity).json(addNewProduct);
  res.status(code.created).json(addNewProduct);
};

module.exports = {
  getAll,
  findById,
  updateProduct,
  deleteProduct,
  newProduct,
};
