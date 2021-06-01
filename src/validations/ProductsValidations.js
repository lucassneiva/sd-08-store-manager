const ProductsModel = require('../models/ProductsModel');

const minLength = 5;
const minNumber = 0;

const validatingAddProduct = (name, quantity) => {
  switch (true) {

  case (name.length <= minLength):
    return ({
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'});

  case(quantity <= minNumber):
    return({ 
      code: 'invalid_data', 
      message: '"quantity" must be larger than or equal to 1'});

  case(typeof quantity === 'string'):
    return({ code: 'invalid_data', message: '"quantity" must be a number'});

  default: return {};
  }
};

const nameRepeated = async (name) => {
  const repName = await ProductsModel.findByName(name);
  if(repName !== null) {
    return({ code: 'invalid_data', message: 'Product already exists'});
  }
  return {};
};

module.exports = {
  validatingAddProduct,
  nameRepeated,
};

