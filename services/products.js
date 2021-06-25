const productModel = require('../models/products');
const { validateName, validateQuantity } = require('./validations');

const addProduct = async (name, quantity) => {
  const verifyName = await validateName(name);
  const verifyQuantity = validateQuantity(quantity);
  
  if (verifyName.isValid && verifyQuantity.isValid) {
    const product = await productModel.addProductDB(name, quantity);
    return product;
  }

  return verifyName.err ? verifyName : verifyQuantity;
};

module.exports = { addProduct };
