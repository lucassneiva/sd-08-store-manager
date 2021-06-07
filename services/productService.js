const productModel = require('../models/productModel');

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const add = async (name, quantity) => {
  const findNameProduct = await productModel.getByName(name);
  if (findNameProduct) {
    return null;
  }
  const addedProduct = await productModel.add(name, quantity);
  return addedProduct;
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  return product;
};

const update = async (id, name, quantity) => {
  const product = await productModel.update(id, name, quantity);
  return product;
};

const exclude = async (id) => {
  const deletedProduct = await productModel.getById(id);
  await productModel.exclude(id);
  return deletedProduct;
};

module.exports = {
  getAll,
  add,
  getById,
  update,
  exclude,
};
