const productsModel = require('../models/products');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  return product;
};

const create = async (name, quantity) => {
  const findByName =  await productsModel.findByName(name);
  if (findByName) return null;
  const product = await productsModel.create(name, quantity);
  return product;
};

const updateById = async (id, updatedProduct) => {
  const product = await productsModel.updateById(id, updatedProduct);
  return product;
};

const deleteById = async (id) => {
  const deletedProduct = await productsModel.getById(id);
  await productsModel.deleteById(id);
  return (deletedProduct);
};

module.exports = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
