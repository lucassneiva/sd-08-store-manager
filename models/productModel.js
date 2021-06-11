const {
  getAll,
  create,
  checkProductName,
  readById,
} = require('./mongoModel');

const getAllProducts = async () => await getAll('products');

const getById = async (id) => await readById('products', id);

const createProduct = async (product) => await create('products', product);

const checkName = async (name) => await checkProductName(name);

module.exports = {
  getAllProducts,
  createProduct,
  checkName,
  getById,
};
