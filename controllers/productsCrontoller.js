const {
  productValidation,
  createProductService,
  getAllProductsService,
  getByIdProductsService,
  updateProductService,
  deleteProductService,
} = require('../services/productsService');

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY= 422;

const createProductController = async (req, res) => {
  const { name, quantity } = req.body;
  const response = productValidation(name, quantity);
  if (response) return res.status(UNPROCESSABLE_ENTITY).json(response);
  const result = await createProductService(name, quantity);
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

const updateProductController = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const response = productValidation(name, quantity);
  if (response) return res.status(UNPROCESSABLE_ENTITY).json(response);
  const result = await updateProductService(id, name, quantity);
  res.status(OK).json(result);
};

const deleteProductController = async (req, res) => {
  const { id } = req.params;
  const result = await deleteProductService(id);
  if (result.err) return res.status(UNPROCESSABLE_ENTITY).json(result);
  res.status(OK).json(result);
};

module.exports = {
  createProductController,
  getAllProductsController,
  getByIdProductsController,
  updateProductController,
  deleteProductController,
};
