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

module.exports = {
  getAllProducts,
  insertAProduct,
};
