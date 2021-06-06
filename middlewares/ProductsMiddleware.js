const ProductService = require('../services/ProductsService');

const STATUS_SUBMIT = '201';
const STATUS_OK = '200';
const STATUS_ERROR = '422';

const getAllProducts = async(_request, response) => {
  try {
    const products = await ProductService.getAll();
    response.status(STATUS_OK).json({ products: products });
  } catch (err) {
    throw new error(err);  
  }
};

const findByIdProduct = async(request, response) => {
  const { id } = request.params;
  const ID_LENGTH = 24;

  if(id.length < ID_LENGTH) return response.status(STATUS_ERROR).json({
    err: { code: 'invalid_data', message: 'Wrong id format'}
  });
  
  const product = await ProductService.findById(id);

  response.status(STATUS_OK).json(product);
};

const createProduct = async(request, response) => {
  const { name, quantity } = request.body;

  const product = await ProductService.create(name, quantity);

  response.status(STATUS_SUBMIT).json(product);
};

const updateProduct = async(request, response) => {
  const { id } = request.params;
  const { name, quantity } = request.body;

  const product = await ProductService.update(id, name, quantity);

  response.status(STATUS_OK).json(product);
};

const removeProduct = async(request, response) => {
  try {
    const { id } = request.params;
    
    const product = await ProductService.remove(id);
  
    response.status(STATUS_OK).json(product);  
  } catch (error) {
    return response.status(STATUS_ERROR).json({
      err: { code: 'invalid_data', message: 'Wrong id format'}
    });
  }
};

module.exports = {
  getAllProducts,
  findByIdProduct,
  createProduct,
  updateProduct,
  removeProduct
};
