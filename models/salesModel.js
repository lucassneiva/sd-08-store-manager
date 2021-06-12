const {
  create,
  getAll,
  readById,
  update,
  // checkProductName,
  // exclude,
} = require('./mongoModel');

const createSales = async (sales) => await create('sales', { itensSold: sales });

const getAllSales = async () => await getAll('sales');
const getSaleById = async (id) => await readById('sales', id);

const updateSale = async (id, sales) => await update('sales', id, { itensSold: sales });

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
  updateSale,
};
