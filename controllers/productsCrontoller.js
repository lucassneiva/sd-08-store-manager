const {
  productValidation,
  createProductService,
  getAllProductsService,
  getByIdProductsService,
} = require('../services/productsService');

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY= 422;

const createProductController = async (req, res) => {
  const product = req.body;
  const response = productValidation(product);
  if (response) return res.status(UNPROCESSABLE_ENTITY).json(response);
  const result = await createProductService(product);
  if (result.err) return res.status(UNPROCESSABLE_ENTITY).json(result);
  res.status(CREATED).json(result);
};

const getAllProductsController = async (req, res) => {
  const products = await getAllProductsService();
  res.status(OK).json(products);
};

const getByIdProductsController = async (req, res) => {
  const { id } = req.params;
  const product = await getByIdProductsService(id);
  if (product.err) return res.status(UNPROCESSABLE_ENTITY).json(product);
  res.status(OK).json(product);
};

module.exports = {
  createProductController,
  getAllProductsController,
  getByIdProductsController,
};
