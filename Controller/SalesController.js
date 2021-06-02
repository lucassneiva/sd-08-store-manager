const ProductModel = require('../models/ProductModel');
const func = require('../util');
const status = require('./status');


const getAll = async () => {
  const result = await ProductModel.getAllProducts();
  const formatedResult = { products: [...result] };
  return formatedResult;
};


const findById = async (id) => {
  const result = await ProductModel.findById(id);
  return result;
};


const editById = async (id, name, quantity) => {
  if (!func.validName(name)) {
    return {
      isError: true,
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '"name" length must be at least 5 characters long',
    };
  };

  if (!func.quantityIsNumber(quantity)) {
    return {
      isError: true,
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '\"quantity\" must be a number',
    };
  };

  if (!func.validInsertQuantity(quantity)) {
    return {
      isError: true,
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '\"quantity\" must be larger than or equal to 1',
    };
  }



  const findProduct = await ProductModel.updateById(id, name, quantity);
  return findProduct;
};


const create = async (name, quantity) => {
  if (!await func.validName(name)) {
    return {
      isError: true,
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '"name" length must be at least 5 characters long',
    };
  };

  if (!await func.quantityIsNumber(quantity)) {
    return {
      isError: true,
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '\"quantity\" must be a number',
    };
  };

  if (!await func.validInsertQuantity(quantity)) {
    return {
      isError: true,
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '\"quantity\" must be larger than or equal to 1',
    };
  }

  const nameResult = await ProductModel.findProductByName(name);

  if (!await func.nameAlreadyExists(nameResult)) {
    return {
      isError: true,
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: 'Product already exists',
    };
  }

  const product = await ProductModel.createProduct(name, quantity);

  return product;
};

const deleteById = async (id) => {
  const product = await ProductModel.deleteProduct(id);
  return product;
};

module.exports = {
  getAll,
  findById,
  create,
  editById,
  deleteById,
};
