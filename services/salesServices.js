const { ObjectId } = require('mongodb');
const Sales = require('../models/salesModels');
const Helper = require('../helpers');

const getAllSales = async () => {
  const allSales = await Sales.getAllSales();
  return { sales: allSales };
};

const getSaleById = async (id) => {
  const notFound = {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  };

  if (!ObjectId.isValid(id)) return notFound;

  const saleById = await Sales.getSaleById(id);
  if (!saleById) return notFound;

  return saleById;
};

const addSale = async (itensSold) => {
  const saleValidation = await Helper.saleValid(itensSold);
  if (saleValidation.err) return saleValidation;

  return await Sales.addSale(itensSold);
};

module.exports = {
  getAllSales,
  getSaleById,
  addSale,
};
