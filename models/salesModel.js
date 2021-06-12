const {
  create,
  getAll,
  readById,
  update,
  exclude,
} = require('./mongoModel');

const createSales = async (sales) => await create('sales', { itensSold: sales });

const getAllSales = async () => await getAll('sales');
const getSaleById = async (id) => await readById('sales', id);

const updateSale = async (id, sales) => await update('sales', id, { itensSold: sales });

const deleteSale = async (id) => await exclude('sales', id);

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
