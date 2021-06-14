const { ObjectId } = require('mongodb');
const SalesModel = require('../models/SalesModel');
const ProductsModel = require('../models/ProductsModel');

const MIN_QUANTITY = 0;

const isValidProduct = (
  { quantity }) => {
  
  if (quantity <= MIN_QUANTITY) return false;
  
  if (!Number.isInteger(quantity)) return false;
  
  return true;
};

const addSale = async (sale) => {

  const saleAlreadyExists = sale
    .every((item) => isValidProduct(item));

  if (!saleAlreadyExists)
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };

  return SalesModel
    .addSale(sale);
};

const getAll = async () => {

  const allSales = await SalesModel
    .getAll();

  return allSales;
};
  
const getAllById = async (id) => {
  
  const sales = await SalesModel
    .getAllById(id);
    
  if (!sales) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  
  return sales;
};

const updateSale = async (
  id,
  saleToUpdate
) => {
  const isValid = saleToUpdate.every((item) => isValidProduct(item));;

  if (!isValid) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    }
  };

  const updatedSale = await SalesModel
    .updateSale(id, saleToUpdate);

  if (!updatedSale) return {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  };

  return updatedSale;
};

const deleteSale = async (id) => {

  const saleToDelete = await getAllById(id);

  await SalesModel
    .deleteSale(id);

  if (saleToDelete.err) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }
  };

  return saleToDelete;
};

module.exports = { 
  addSale,
  isValidProduct,
  getAll,
  getAllById,
  updateSale,
  deleteSale,
};