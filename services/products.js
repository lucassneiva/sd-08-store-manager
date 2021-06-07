const products = require('../models/products');

const error = require('../helpers/error');
const sucess = require('../helpers/sucess');

const ZERO = 0;
const FIVE = 5;

const addProduct = async (name, quantity) => {
  if(name.length < FIVE) return error('"name" length must be at least 5 characters long');
  if(quantity <= ZERO) {
    return error('"quantity" must be larger than or equal to 1');
  }
  if(typeof quantity !== 'number') return error('"quantity" must be a number');

  const findSameProduct = await products.findProductByName(name);
  if(findSameProduct) return error('Product already exists');

  const product = await products.addProduct(name, quantity);
  if (!product) {
    throw new Error('product not created successfully');
  }
  return sucess({
    _id: product.insertedId,
    name,
    quantity,
  });
};

module.exports = {
  addProduct,
};
