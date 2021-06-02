const ProductModel = require('../models/produtcModel');
const ErrorMessages = require('./errorMessages');
const CustomError = require('../services/customErro');
const { ObjectId } = require('mongodb');

const UNPROCESSABLE_ENTITY = 422;
const MIN_QUANTITY = 1;

const validateProductId = (productId) => {
  if (!ObjectId.isValid((productId))) {
    throw new CustomError(
      ErrorMessages.invalidData,
      ErrorMessages.saleProductInvalidIdOrQty,
      UNPROCESSABLE_ENTITY
    );
  }
};

const validateQuantity = (quantity) => {
  if (typeof quantity !== 'number') {
    throw new CustomError(
      ErrorMessages.invalidData,
      ErrorMessages.saleProductInvalidIdOrQty,
      UNPROCESSABLE_ENTITY
    );
  }
  
  if ( Number(quantity) < MIN_QUANTITY) {
    throw new CustomError(
      ErrorMessages.invalidData,
      ErrorMessages.saleProductInvalidIdOrQty,
      UNPROCESSABLE_ENTITY
    );
  }
};

const productAlreadyExists = async (productId) => {
  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new CustomError(
      ErrorMessages.invalidData,
      ErrorMessages.saleProductInvalidIdOrQty,
      UNPROCESSABLE_ENTITY
    );
  }
};

const prductsValidations = async (products) => {  
  for (const product of products) {
    const { productId, quantity } = product;

    validateProductId(productId);
    validateQuantity(quantity);
    await productAlreadyExists(productId);
  }
};

module.exports = {
  prductsValidations,
};
