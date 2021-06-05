const { SALES } = require('./constants');
const { addNew, getAll, getById } = require('./functions');
  
const addSale = async(sale) => await addNew({itensSold: sale}, SALES);

const getAllSales = async() => await getAll(SALES);

const getSaleById = async(id) => await getById(id, SALES);

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
};
