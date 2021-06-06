const { quantityInvalidNumber } = require('./errorMessages');

const ZERO = 0;

const newObjectFormat = (obj) => {
  const newObject = obj.map(product => ({
    productId: product.productId,
    quantity: product.quantity
  }));

  return {
    itensSold: newObject
  };
};

const validateEntries = (quantity) => {
  if(quantity <= ZERO || typeof(quantity) !== 'number') return quantityInvalidNumber;
};

module.exports = {
  newObjectFormat,
  validateEntries,
};
