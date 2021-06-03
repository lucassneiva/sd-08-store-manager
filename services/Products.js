const Products = require('../models/Products');
const { status, message, code } = require('../schema/status');

const create = async (name, quantity) => {
  const existingProduct = await Products.findByName(name);

  if (existingProduct) {
    return {
      isError: true,
      status: status.unprocessable,
      code: code.invalidData,
      message: message.productExists,
    };
  };
  const createdProduct = await Products.create(name, quantity);
  return createdProduct;
};

const findAll = async () => {
  const products = await Products.findAll();
  return products;
};

const findById = async (id) => {
  const productById = await Products.findById(id);
  return productById;
};

const updateById = async (id, name, quantity ) => {
  const updateProduct = await Products.create(id, name, quantity);
  return updateProduct;
};

const deleteById = async (id) => {
  const deleteProduct = await Products.deleteById(id);
  return deleteProduct;
};

module.exports = {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
};
