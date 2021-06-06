const ProductService = require('../services/ProductsService');

const STATUS_OK = '201';

const createProduct = async(request, response) => {
  const { name, quantity } = request.body;

  const product = await ProductService.create(name, quantity);

  response.status(STATUS_OK).json(product);
};

module.exports = {
  createProduct,
};

