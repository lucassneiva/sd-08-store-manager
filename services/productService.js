const ProductModel = require('../models/produtcModel');
const ProductValidation = require('./productValidation');
const ErrorMessages = require('../services/errorMessages');

const ZERO = 0;

const findById = async (id) => {  
  const productData = await ProductModel.findById(id);
  
  if (!productData) return null;

  return productData;
};

const getAll = async () => {
  const produtcsData = await ProductModel.getAll();

  return produtcsData;
};

const create = async ({ name, quantity }) => {
  const messageError = await ProductValidation.isValid(name, quantity);

  if (messageError && Object.keys(messageError).length !== ZERO) return { 
    err: {
      code: 'invalid_data',
      message: messageError,
    }
  };

  const { _id } = await ProductModel
    .create({ name, quantity });

  return {
    _id,
    name,
    quantity,
  };
};

const update = async (id, newProduct) => {
  const { name, quantity } = newProduct;

  const messageError = await ProductValidation.isValidUpdate(name, quantity);

  if (messageError && Object.keys(messageError).length !== ZERO) return { 
    err: {
      code: 'invalid_data',
      message: messageError,
    }
  };

  return await ProductModel.update(id, { name, quantity });
};

const exclude = async (id) => {
  const produtcsData = await ProductModel.exclude(id);

  if (!produtcsData) return {
    err: {
      code: 'invalid_data',
      message: ErrorMessages.productNotFound,
    }
  };

  return produtcsData;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  exclude,
};
