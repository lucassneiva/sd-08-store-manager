const { getAll, create, checkProductName } = require('./mongoModel');

const getAllProducts = async () => await getAll('products');

const createProduct = async (product) => await create('products', product);

const checkName = async (name) => await checkProductName(name);

module.exports = {
  getAllProducts,
  createProduct,
  checkName,
};
