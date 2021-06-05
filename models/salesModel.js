const { SALES } = require('./constants');
const { addNew } = require('./functions');
  
const addSale = async(sale) => await addNew({itensSold: sale}, SALES);

module.exports = {
  addSale,
};
