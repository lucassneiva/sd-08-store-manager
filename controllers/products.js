const productsService = require('../services/products');

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await productsService.create(name, quantity);
  if (typeof product === 'string') return res.status(UNPROCESSABLE).json({
    err: {
      code: 'invalid_data',
      message: product,
    }
  });

  res.status(CREATED).json({ ...product });
};

const getAll = async (_req, res) => {
  const products = await productsService.getAll();

  res.status(OK).json({ products });
};

const getById = async (req, res) => {
  const { id } = req.params;

  const product = await productsService.getById(id);
  if (typeof product === 'string') return res.status(UNPROCESSABLE).json({
    err: {
      code: 'invalid_data',
      message: product,
    }
  });

  res.status(OK).json({ ...product });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productsService.update(id, name, quantity);
  if (typeof product === 'string') return res.status(UNPROCESSABLE).json({
    err: {
      code: 'invalid_data',
      message: product,
    }
  });

  res.status(OK).json({ ...product });
};

const erase = async (req, res) => {
  const { id } = req.params;

  const product = await productsService.erase(id);
  if (typeof product === 'string') return res.status(UNPROCESSABLE).json({
    err: {
      code: 'invalid_data',
      message: product,
    }
  });

  res.status(OK).json({ message: 'Product deleted.' });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  erase,
};
