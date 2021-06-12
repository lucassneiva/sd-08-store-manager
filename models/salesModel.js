const {
  create,
  getAll,
  readById,
  // checkProductName,
  // update,
  // exclude,
} = require('./mongoModel');

const createSales = async (sales) => await create('sales', { itensSold: sales });

const getAllSales = async () => await getAll('sales');
const getSaleById = async (id) => await readById('sales', id);

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
};
