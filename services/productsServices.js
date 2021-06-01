const { ObjectId } = require('mongodb');
const productsModels = require('../models/productsModel');
const { isValidName, isValidQuantity, alreadyExists } = require('./productsValidations');

const getAllProducts = async () => await productsModels.getAllProducts();

const erroID = {
  err: {
    code: 'invalid_data',
    message: 'Wrong id format',
    status: 422,
  },
};

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
  if (!ObjectId.isValid(id)) return erroID;
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

  if (!ObjectId.isValid(id)) return erroID;

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

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return erroID;
  const response = productsModels.deleteProduct(id);
  return response;
};

module.exports = {
  getAllProducts,
  insertAProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
