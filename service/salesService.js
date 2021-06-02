const { ObjectId } = require('bson');
const model = require('../models/salesModel');

const validateSale = async (quantity) => {
  const minimum = 0;
  if (quantity <= minimum || typeof quantity !== 'number') {
    return 'Wrong product ID or invalid quantity';
  }
  return undefined;
};

const createSale = async (sale) => {
  const isValid = await validateSale(sale[0].quantity);
  if (isValid !== undefined) {
    throw new Error(isValid);
  }
  return model.createSale(sale);
};

module.exports = {
  createSale,
};
