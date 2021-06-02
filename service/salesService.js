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

const getAllSales = async () => {
  const salesList = await model.getAllSales();
  return salesList;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Sale not found');
  const saleById = await model.findById(id);
  // if (!product || !ObjectId.isValid(id)) {
  //   throw new Error('Wrong id format');
  // }
  return saleById;
};

module.exports = {
  createSale,
  getAllSales,
  findById,
};
