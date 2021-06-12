const {
  getAll,
  create,
  readById,
  update,
  exclude,
} = require('./mongoModel');

const getAllSales = async () => await getAll('sales');

const getById = async (id) => await readById('sales', id);

// const createSale = async (sale) => await create('sales', sale);

// const updateSale = async (id, sale) => await update('sales', id, sale);

// const deleteSale = async (id) => await exclude('sales', id);

module.exports = {
  getAllSales,
  // createSale,
  getById,
  // updateSale,
  // deleteSale,
};
