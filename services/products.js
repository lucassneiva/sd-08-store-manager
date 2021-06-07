const products = require('../models/products');

const error = require('../helpers/error');
const sucess = require('../helpers/sucess');
const success = require('../helpers/sucess');

const ZERO = 0;
const FIVE = 5;
const TWELVE = 12;
const TWENTYFOUR= 24;

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

const getProducts = async () => {
  const allProducts = await products.getProducts();
  return allProducts;
};
const getProductById = async (id) => {
  if (!id || id.length !== TWELVE && id.length !== TWENTYFOUR) {
    return error('Wrong id format');
  }
  const product = await products.getProductById(id);
  if(!product) return error('Wrong id format');
  const { name, quantity } = product;
  return success({
    id,
    name,
    quantity
  });
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
};
