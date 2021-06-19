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

const addSale = async (sales) => {
  const quantityArray = sales.map((sale) => Helper.saleValid(sale.quantity));
  if (quantityArray.find((soldItem) => soldItem.err)) {
    return quantityArray.find((invalidItem) => invalidItem.err);
  }

  return await Sales.addSale(sales);
};

const updateSale = async (id, productId, quantity) => {
  const saleValidation = Helper.saleValid(quantity);
  if (saleValidation.err) return saleValidation;

  await Sales.updateSale(id, productId, quantity);
  return { _id: id, itensSold: [{ productId, quantity }] };
};

const deleteSale = async (id) => {
  const wrongSaleId = {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }
  };
  if (!ObjectId.isValid(id)) return wrongSaleId;

  const deletedSale = await Sales.deleteSale(id);
  if (!deletedSale) return wrongSaleId;

  return deletedSale;
};

module.exports = {
  getAllSales,
  getSaleById,
  addSale,
  updateSale,
  deleteSale,
};
