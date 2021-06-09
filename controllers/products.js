const Products = require('../services/products');

// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
const STATUS_200 = 200; // Respostas de sucesso (200-299)
const STATUS_201= 201;
const STATUS_422 = 422; // Erros do cliente (400-499)

const create = async (req, res) => {
  const newProduct = req.body;

  const product = await Products.add(newProduct);

  if (product.err) {
    return res.status(STATUS_422).json(product);
  }

  return res.status(STATUS_201).json(product);
};

const getAll = async (_req, res) => {
  const products = await Products.getAll();

  return res.status(STATUS_200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const product = await Products.getById(id);

  if (product.err) res.status(STATUS_422).json(product);

  return res.status(STATUS_200).json(product);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;

  const product = await Products.updateById(id, updatedProduct) ;

  if (product.err) res.status(STATUS_422).json(product);

  return res.status(STATUS_200).json(product);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const product = await Products.deleteById(id);

  if (product.err) {
    return res.status(STATUS_422).json(product);
  }

  return res.status(STATUS_200).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
