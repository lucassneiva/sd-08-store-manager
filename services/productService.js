const ProductModel = require('../models/produtcModel');
const ErrorMessages = require('./errorMessages');

const MIN_LENGTH_NAME = 5;
const MIN_QUANTITY = 1;
const ZERO = 0;

const isValid = async (name, quantity) => {
  if (!name || typeof name !== 'string' || name.length < MIN_LENGTH_NAME)
    return ErrorMessages.productName;

  if (typeof quantity !== 'number') return ErrorMessages.productQuantityIsNotNumber;
  
  if ( Number(quantity) < MIN_QUANTITY) return ErrorMessages.productQuantityLength;
    
  if (await ProductModel.findByName(name)) return ErrorMessages.productAlreadyExists;

  return {};
};

const create = async ({ name, quantity }) => {
  const messageError = await isValid(name, quantity);

  console.log(messageError);

  if (messageError && Object.keys(messageError).length !== ZERO) return { 
    err: {
      code: 'invalid_data',
      message: messageError,
    }
  };

  const { id } = await ProductModel
    .create({ name, quantity });

  return {
    id,
    name,
    quantity,
  };
};

module.exports = {
  create,
};
