const ProductsModel = require('../models/ProductsModel');
const ProductsValidation = require('../validations/ProductsValidations');

const getAll = async () => {
  const products = await ProductsModel.getAll();
  return({ products: products });
};

const create = async (name, quantity) => {

  const validation = await ProductsValidation.validatingAddProduct(name, quantity);
  if (validation.message) return validation;

  const validateName = await ProductsValidation.nameRepeated(name);
  if (validateName.message) return validateName;

  const createProduct = await ProductsModel.create(name, quantity);

  return({ createProduct });

};

module.exports = {
  getAll,
  create,
};
