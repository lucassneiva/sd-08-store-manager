const modelProduct = require('../models/productModel');
const schema = require('../schema/product');
const isValidResult = require('../schema/internalErrors');

const productCreate = async (newProduct) => {
  const isValid = schema(newProduct);
  if (isValid.error) return isValidResult(isValid);
  const productExists = await modelProduct.getByKey({
    name: newProduct.name 
  });
  if (productExists) {
    return isValidResult('product_exists');
  }
  const newId = await modelProduct.create(newProduct);
  isValid.value._id = newId._id;
  return isValidResult(isValid);
};

module.exports = {
  productCreate,
};