const ProductsService = require('../services/productService');
const ErrorMessages = require('../services/errorMessages');

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

const getAll = async (_req, res) => {
  const products = await ProductsService.getAll();

  res.status(OK).json(products);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await ProductsService
    .create({ name, quantity });

  let statusCode = CREATED;

  if (product.hasOwnProperty('err')) statusCode = UNPROCESSABLE_ENTITY;

  res
    .status(statusCode)
    .json(product);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const product = await ProductsService.findById(id);

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

module.exports = {
  create,
  getAll,
  findById,
};