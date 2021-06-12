const {
  create,
  // getAll,
  // checkProductName,
  // readById,
  // update,
  // exclude,
} = require('./mongoModel');

const createSales = async (sales) => await create('sales', { itensSold: sales });

module.exports = {
  createSales,
};
