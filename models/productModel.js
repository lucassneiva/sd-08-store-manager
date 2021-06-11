const { getAll, create } = require('./mongoModel');

const getAllProducts = async () => await getAll('products');

const createProduct = async (product) => await create('products', product);

module.exports = { getAllProducts, createProduct };
