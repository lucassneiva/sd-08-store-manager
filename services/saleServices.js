const { SALES } = require('../models/constants');
const SalesModel = require('../models/salesModel');
const { generateError, errorMsgs, errorCodes } = require('./errors');

const { wrongIdOrQuantity, saleNotFound, wrongSaleIdFormat } = errorMsgs;
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

const updateSale = async(id, toUpdate) => {

  if (toUpdate.find(product => product.quantity < 1)) {
    return generateError(wrongIdOrQuantity);
  }

  if (toUpdate.find(product => typeof product.quantity === 'string')) {
    return generateError(wrongIdOrQuantity);
  }

  await SalesModel.updateSale(id, toUpdate);
  const updatedSale = await getSaleById(id);
  return updatedSale;
};

const deleteSale = async(id) => {
  const deletedSale = await SalesModel.deleteSaleById(id);
  if (!deletedSale) return generateError(wrongSaleIdFormat);
  return deletedSale;
};

const checkSaleExists = async(id) => {
  const foundSale = await SalesModel.getSaleById(id);
  if(!foundSale) return generateError(wrongSaleIdFormat);
  return foundSale;
};

module.exports = {
  addSales,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  checkSaleExists,
};
