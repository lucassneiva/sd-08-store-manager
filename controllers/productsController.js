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

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const {status, err, update} = await ProductsService
    .updateById(id, name, quantity);

  if (status !== SUCCESS) {
    return res.status(status).json({ err });
  }

  res.status(status).json(update);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  
  const { status, err, deleted } = await ProductsService
    .deleteById(id);
  
  if (status !== SUCCESS) return res.status(status).json({err});

  res.status(status).json(deleted);
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
