const Sales = require('../models/Sales');
const Products = require('../models/Products');

const create = async (itensSold) => {
  const productsPromises = itensSold.map(({ productId }) => Products.findById(productId));

  const products = await Promise.all(productsPromises);

  const productNotFound = products.some(product => !product);

  if(productNotFound) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }

  return Sales.create(itensSold);
};

const findAll = async () => Sales.findAll();

const findById = async (id) => {
  const sale = await Sales.findById(id);

  if (!sale) {
    return {
      error: {
        code: 'not_found',
        message: 'Sale not found'
      }
    };
  }

  return sale;
};

module.exports = {
  create,
  findAll,
  findById
};