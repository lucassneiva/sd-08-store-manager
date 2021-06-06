const { SALES } = require('./constants');
const { addNew, getAll, getById, update, deleteById } = require('./functions');
  
const addSale = async(sale) => await addNew({itensSold: sale}, SALES);

const getAllSales = async() => await getAll(SALES);

const getSaleById = async(id) => await getById(id, SALES);

const updateSale = async(id, toUpdate) => (
  await update(id, {itensSold: toUpdate}, SALES)
);

const deleteSaleById = async(id) => await deleteById(id, SALES);


module.exports = {
  addSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSaleById,
};
