const ProductsModel = require('../models/productsModel');


const errorMsgs = {
  shortName: '"name" length must be at least 5 characters long',
  alreadyExists: 'Product already exists', 
  invalidQuantity: '"quantity" must be larger than or equal to 1',
  quantityNotNumber: '"quantity" must be a number',
};

const errorMessage = (message) => (
  {
    err: {
      code: 'invalid_data',
      message
    }
  }
);

const SHORTEST_NAME_ALLOWED = 6;
const SMALLEST_QUANTITY_ALLOWED = 1;
const {shortName, alreadyExists, invalidQuantity, quantityNotNumber} = errorMsgs;

const addProduct = async(name, quantity) => {
  
  if (name.length < SHORTEST_NAME_ALLOWED ) return errorMessage(shortName);

  const productFound = await ProductsModel.getByName(name);

  if (productFound) return errorMessage(alreadyExists);

  if (quantity < SMALLEST_QUANTITY_ALLOWED) return errorMessage(invalidQuantity);

  if (typeof quantity === 'string') return errorMessage(quantityNotNumber);

  const added = await ProductsModel.add(name, quantity);

  return added.ops[0];

};

module.exports = {
  addProduct
};
