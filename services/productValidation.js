const ErrorMessages = require('./errorMessages');
const ProductModel = require('../models/produtcModel');

const MIN_LENGTH_NAME = 5;
const MIN_QUANTITY = 1;

const isValid = async (name, quantity) => {  
  if (!name || typeof name !== 'string' || name.length < MIN_LENGTH_NAME)
    return ErrorMessages.productName;

  if (typeof quantity !== 'number') return ErrorMessages.productQuantityIsNotNumber;
  
  if ( Number(quantity) < MIN_QUANTITY) return ErrorMessages.productQuantityLength;
    
  if (await ProductModel.findByName(name)) return ErrorMessages.productAlreadyExists;

  return {};
};

const isValidUpdate = async (name, quantity) => {  
  if (!name || typeof name !== 'string' || name.length < MIN_LENGTH_NAME)
    return ErrorMessages.productName;

  if (typeof quantity !== 'number') return ErrorMessages.productQuantityIsNotNumber;
  
  if ( Number(quantity) < MIN_QUANTITY) return ErrorMessages.productQuantityLength;
    
  return {};
};

module.exports = {
  isValid,
  isValidUpdate,
};
