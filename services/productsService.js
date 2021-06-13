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

const deleteProduct = async (id) => {
  const product = await getProductById(id);
  if(product instanceof Error) return product;
  return productsModel.deleteProduct(id).then(() => product);
};

module.exports = {
  addProduct,
  getProductById,
  deleteProduct
};