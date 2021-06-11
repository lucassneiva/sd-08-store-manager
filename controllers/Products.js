const Products = require('../services/Products');

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

const add = async (req, res) => {
  const newProduct = req.body;

  const product = await Products.add(newProduct);

  if (product.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(product);
  }
  return res.status(CREATED).json(product);
};

const getAll = async (_req, res) => {
  const products = await Products.getAll();
  return res.status(OK).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const product = await Products.getById(id);

  if (product.err) res.status(UNPROCESSABLE_ENTITY).json(product);

  return res.status(OK).json(product);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;

  const product = await Products.updateById(id, updatedProduct) ;

  if (product.err) res.status(UNPROCESSABLE_ENTITY).json(product);

  return res.status(OK).json(product);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const product = await Products.deleteById(id);
  
  if (product.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(product);
  }

  return res.status(OK).json(product);
};

module.exports = {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
};
