const productsModel = require('../models/productsModel');

const addProduct = async (data) => {
  const { name, quantity } = data;
  const [product] = await productsModel.getProductByName(name);
  if(product) {
    return new Error('Product already exists');
  }
  return productsModel.createProduct(name, quantity);
};

const getProductById = async (id) => {
  const idError = new Error('Wrong id format');
  return productsModel.getProductById(id).then((obj) => {
    if(!obj) return idError;
    return obj;
  });
};

module.exports = {
  addProduct,
  getProductById,
};