const Products = require('../services/Products');

const STATUS_CODE_OK = 200;
const STATUS_CODE_CREATED = 201;
const STATUS_CODE_ERROR = 422;


const getAll = async (_req, res) => {
  const products = await Products.getAll();
  res.status(STATUS_CODE_OK).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await Products.getById(id);
  if (product.err) return res.status(STATUS_CODE_ERROR).json(product);
  res.status(STATUS_CODE_OK).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await Products.create(name, quantity);
  if (product.err) return res.status(STATUS_CODE_ERROR).json(product);
  res.status(STATUS_CODE_CREATED).json(product);
};

const update = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const product = await Products.update(id, { name, quantity });
  if (product.err) return res.status(STATUS_CODE_ERROR).json(product);
  res.status(STATUS_CODE_OK).json(product);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const product = await Products.remove(id);
  if (product.err) return res.status(STATUS_CODE_ERROR).json(product);
  res.status(STATUS_CODE_OK).json(product);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};