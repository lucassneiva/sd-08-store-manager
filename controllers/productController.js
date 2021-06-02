const ProductService = require('../services/productService');
const ErrorMessages = require('../services/errorMessages');

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

const getAll = async (_req, res) => {
  const allProducts = await ProductService.getAll();

  res.status(OK).json({ products: allProducts });
};

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await ProductService
    .create({ name, quantity });

  let statusCode = CREATED;

  if (product.hasOwnProperty('err')) statusCode = UNPROCESSABLE_ENTITY;

  res
    .status(statusCode)
    .json(product);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const product = await ProductService.findById(id);

  if (!product) {
    return res.status(UNPROCESSABLE_ENTITY)
      .json(
        {
          err: {
            code: 'invalid_data',
            message: ErrorMessages.productNotFound,
          }
        }
      );
  }

  res.status(OK)
    .json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  
  const updatedProduct = await ProductService
    .update(id, { name, quantity });
  
  let statusCode = OK;

  if (updatedProduct.hasOwnProperty('err')) statusCode = UNPROCESSABLE_ENTITY;

  res
    .status(statusCode)
    .json(updatedProduct);
};

const exclude = async (req, res) => {
  const { id } = req.params;

  const products = await ProductService.exclude(id);

  let statusCode = OK;

  if (products.hasOwnProperty('err')) statusCode = UNPROCESSABLE_ENTITY;

  res
    .status(statusCode)
    .json(products);
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  exclude,
};