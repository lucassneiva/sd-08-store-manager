const ProductModel = require('../models/productsModel');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const insertedProduct = await ProductModel.create(name, quantity);
  return insertedProduct;
};

const findByName = async (name) => {
  const productByName = await ProductModel.findByName(name);
  return productByName;
};

const findById = async(id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  };
  const product = await ProductModel.findById(id);
  return product;
};

const listAllProducts = async () => {
  const allProducts = await ProductModel.findProducts();
  return {
    products: allProducts,
  };
};

const updateProduct = async (id, product) => {
  console.log('srvice product', product);
  if (!ObjectId.isValid(id)) {
    return null;
  };
  const updatedProduct = await ProductModel.updateProduct(id, product);
  return updatedProduct;
};

module.exports = {
  create,
  findByName,
  findById,
  listAllProducts,
  updateProduct,
};