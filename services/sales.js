const salesModel = require('../models/sales.js');

const addNewSale = async (itensSold) => {
  const result = await salesModel.addNewSale(itensSold);
  return result;
};

module.exports = {
  addNewSale,
};
