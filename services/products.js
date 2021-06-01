const ProductsModel = require('../models/products');

const isValid = async ({name, quantity}) => {
  const products = ProductsModel.read();

  const thisNameExists = products.find((product) => product.name === name);

  const MIN_LENGTH_NAME = 6;

  if(!name || name.length < MIN_LENGTH_NAME) return false;
  if(!quantity || typeof quantity !== 'number' || quantity < 1) return false;
  if(thisNameExists) return false;

  return true;

};

const create =  async ({name, quantity}) => {
  const isProductValid = isValid({name, quantity});

  if(!isProductValid) return false;

  const productInserted = ProductsModel
    .create({name, quantity});

  return productInserted;
};

module.exports = {
  create,
};