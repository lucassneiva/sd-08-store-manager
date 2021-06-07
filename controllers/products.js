const productsService = require('../services/products');

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE = 422;

const create = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await productsService.create(name, quantity);
    res.status(CREATED).json({ ...product });
  } catch (e) {
    res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: e.message,
      }
    });
  }
};

const getAll = async (_req, res) => {
  const products = await productsService.getAll();

  res.status(OK).json({ products });
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id);
    res.status(OK).json({ ...product });
  } catch (e) {
    res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: e.message,
      }
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await productsService.update(id, name, quantity);
    res.status(OK).json({ ...product });
  } catch (e) {
    res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: e.message,
      }
    });
  }
};

const erase = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.erase(id);
    res.status(OK).json({ message: 'Product deleted.' });
  } catch (e) {
    res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: e.message,
      }
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  erase,
};
