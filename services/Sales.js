const Sales = require('../models/Sales');
const Products = require('../models/Products');

const create = async (itensSold) => {
  const productsPromises = itensSold.map(({ productId }) => Products.findById(productId));

  const products = await Promise.all(productsPromises);

  const productNotFound = products.some(product => !product);

  if(productNotFound) {
    return {
      error: {
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }

  return Sales.create(itensSold);
};

module.exports = {
  create,
};