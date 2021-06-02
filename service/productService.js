const { ObjectId } = require('bson');
const product = require('../models/productModel');

const NAME_LENGTH = 5;
const QUANTITY = 0;

const validateProduct = async (name, quantity, product) => {
  if (name.length <= NAME_LENGTH) {
    return '"name" length must be at least 5 characters long';
  }
  if (product) {
    return 'Product already exists';
  }
  if (quantity <= QUANTITY) {
    return '"quantity" must be larger than or equal to 1';
  }
  if (typeof quantity !== 'number') {
    return '"quantity" must be a number';
  }
  return undefined;
};

const validateUpdate = async (name, quantity) => {
  if (name.length <= NAME_LENGTH) {
    return '"name" length must be at least 5 characters long';
  }
  if (quantity <= QUANTITY) {
    return '"quantity" must be larger than or equal to 1';
  }
  if (typeof quantity !== 'number') {
    return '"quantity" must be a number';
  }
  return undefined;
};

const createProduct = async (name, quantity) => {
  const findProduct = await product.findProduct(name);
  const invalid = await validateProduct(name, quantity, findProduct);
  if (invalid) {
    throw new Error(invalid);
  }
  return product.createProduct(name, quantity);
};

const getAllProducts = async () => {
  const productsList = await product.getAllProducts();
  return productsList;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong id format');
  const productById = await product.findById(id);
  // if (!product || !ObjectId.isValid(id)) {
  //   throw new Error('Wrong id format');
  // }
  return productById;
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong id format');
  const invalid = await validateUpdate(name, quantity);
  if (invalid) {
    throw new Error(invalid);
  }
  return product.updateProduct(id, name, quantity);
};

module.exports = { createProduct, getAllProducts, findById, updateProduct };
