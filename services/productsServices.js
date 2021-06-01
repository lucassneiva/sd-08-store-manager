const { ObjectId } = require('mongodb');
const productsModels = require('../models/productsModel');
const { isValidName, isValidQuantity, alreadyExists } = require('./productsValidations');

const getAllProducts = async () => await productsModels.getAllProducts();

const insertAProduct = async (name, quantity) => {
  const nameValidation = isValidName(name);
  const quantityValidation = isValidQuantity(quantity);
  const products = await getAllProducts();
  const exists = alreadyExists(products, name);

  if (nameValidation.err) return nameValidation;

  if (quantityValidation.err) return quantityValidation;

  if (exists.err) return exists;

  return productsModels.insertAProduct(name, quantity);
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id))
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
        status: 422,
      },
    };
  const response = await productsModels.getProductById(id);
  if (!response)
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
        status: 422,
      },
    };
  return response;
};

const updateProduct = async (id, name, quantity) => {
  const nameValidation = isValidName(name);
  const quantityValidation = isValidQuantity(quantity);

  if (nameValidation.err) return nameValidation;
  if (quantityValidation.err) return quantityValidation;

  if (!ObjectId.isValid(id))
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
        status: 422,
      },
    };

  const response = await productsModels.updateProduct(id, name, quantity);

  if (!response)
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
        status: 422,
      },
    };
  return response;
};

module.exports = {
  getAllProducts,
  insertAProduct,
  getProductById,
  updateProduct,
};
