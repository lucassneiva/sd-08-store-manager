const ProductsService = require('../services/productsService');

const SUCCESS = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTRY = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { status, err, productCreated } = await ProductsService
    .create({name, quantity});

  if (status !== CREATED) {
    return res.status(status).json({ err });
  }

  res.status(status).json(productCreated);
};

const getAll = async (req, res) => {
  const allProducts = await ProductsService
    .getAll();

  res.status(SUCCESS).json(allProducts);
};

const getById = async (req, res) => {
  const { id }= req.params;

  const product = await ProductsService
    .getById(id);
  
  if (product.err) return res.status(UNPROCESSABLE_ENTRY).json(product);

  res.status(SUCCESS).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
};
