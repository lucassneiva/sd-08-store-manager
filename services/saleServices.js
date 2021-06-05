const SalesModel = require('../models/salesModel');
const { generateError, errorMsgs, errorCodes } = require('./errors');

const { wrongIdOrQuantity, saleNotFound } = errorMsgs;
const { NOT_FOUND_ERR } = errorCodes;

const addSales = async(sale) => {

  if (sale.find(product => product.quantity < 1)) {
    return generateError(wrongIdOrQuantity);
  }

  if (sale.find(product => typeof product.quantity === 'string')) {
    return generateError(wrongIdOrQuantity);
  }

  const added = await SalesModel.addSale(sale);

  return added.ops[0];
};

const getAllSales = async() => await SalesModel.getAllSales();

const getSaleById = async(id) => {
  const saleFound = await SalesModel.getSaleById(id);
  return saleFound || generateError(saleNotFound, NOT_FOUND_ERR);  
};

module.exports = {
  addSales,
  getAllSales,
  getSaleById,
};
