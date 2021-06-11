const {
  getAll,
  create,
  checkProductName,
  readById,
  update,
} = require('./mongoModel');

const getAllProducts = async () => await getAll('products');

const getById = async (id) => await readById('products', id);

const createProduct = async (product) => await create('products', product);

const updateProduct = async (id, product) => await update('products', id, product);

const checkName = async (name) => await checkProductName(name);

module.exports = {
  getAllProducts,
  createProduct,
  checkName,
  getById,
  updateProduct,
};
