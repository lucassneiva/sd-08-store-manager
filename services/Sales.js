const Sales = require('../models/Sales');

const getAll = async () => Sales.getAll();

const newSale = async (productsArray) => Sales.newSale(productsArray);

const findById = async (id) => {
  const findSale = await Sales.findById(id);

  if (!findSale) return { err: {
    code: 'not_found',
    message: 'Sale not found',
  } };
  return findSale;
};

const updateSale = async (id, modifiedSale) => Sales.updateSale(id, modifiedSale);

const deleteSale = async (id) => {
  const deleteSale = await Sales.deleteSale(id);
  if (!deleteSale) return { err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
  } };

  return deleteSale;
};

module.exports = {
  getAll,
  newSale,
  findById,
  updateSale,
  deleteSale,
};
