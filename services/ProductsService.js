const ProductsModel = require('../models/ProductsModel');

const MIN_NAME_LENGTH = 5;
const MIN_QUANTITY = 0;

const addProduct = async (product) => {

  const productValidation = isValidProduct(product);

  if (productValidation.err) return productValidation;

  const productAlreadyExists = await ProductsModel
    .findProduct(product);

  if (productAlreadyExists) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  return ProductsModel
    .addProduct(product);
};

const isValidProduct = (product) => {

  const { name, quantity } = product;

  if (typeof name !== 'string' || name.length <= MIN_NAME_LENGTH) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  
  if (quantity <= MIN_QUANTITY) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }

  if (!Number.isInteger(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
  return 'validated';
};

const getAll = async () => {

  const products = await ProductsModel
    .getAll();

  return { products };
};

const getAllById = async (id) => {

  const product = await ProductsModel
    .getAllById(id);

  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return product;
};

const updateProduct = async (id, newProduct) => {

  const result = await ProductsModel
    .updateProduct(id, newProduct);

  const validation = isValidProduct(newProduct);

  if (validation.err) return validation;


  if (!result) return {
    err: {
      code: 'not_found',
      message: 'Id not found'
    }
  };

  return result;
};

const deleteProduct = async (id) => {
  
  const deleteSuccessful = await ProductsModel.
    getAll(id);

  const productToDelete = await ProductsModel
    .deleteProduct(id);

  if (!productToDelete) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return deleteSuccessful;
};

module.exports = {
  addProduct,
  isValidProduct,
  getAll,
  getAllById,
  updateProduct,
  deleteProduct,
};