const ProductModel = require('../models/product');



const addNewProduct = async (name, quantity) => {
  const newProduct = await ProductModel.addNewProduct(name, quantity);
  return newProduct;
};

const getAllProducts = async () => {
  const allproducts = await ProductModel.getAllProducts();
  return allproducts;
};

const getById = async (id) => {
  const idProduct = await ProductModel.getById(id);
  return idProduct;
};

const update = async (id, name, quantity) => {
  const updateProduct = await ProductModel.update(id, name, quantity);
  return updateProduct;
};

module.exports = {
  addNewProduct,
  getAllProducts,
  getById,
  update
};
