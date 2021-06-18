const Products = require('../models/Products');
const {UNPROCESSABLE_ENTITY}=require('./variableStatus');

const createProduct = async (name, quantity) => {
  const verifyName = await Products.findByName(name);
  if (verifyName) {
    return {
      error: {
        code: UNPROCESSABLE_ENTITY,
        message: 'Product already exists'
      }
    };
  }
  return await Products.createProduct(name, quantity);
};


module.exports = {
  createProduct
};