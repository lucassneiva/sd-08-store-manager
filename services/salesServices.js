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
  if (quantityArray.find((soldItem) => quantityArray.err)) {
    return quantityArray.find((invalidItem) => invalidItem.err);
  }

  return await Sales.addSale(sales);
};

const updateSale = async (id, productId, quantity) => {
  const quantityValidation = Helper.saleValid(quantity);
  if (quantityValidation.err) return quantityValidation;

  await Sales.updateSale(id, productId, quantity);
  return { _id: id, itensSold: [{ productId, quantity }] };
};

module.exports = {
  getAllSales,
  getSaleById,
  addSale,
  updateSale,
};
