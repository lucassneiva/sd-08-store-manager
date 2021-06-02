const sales = require('../model/sales');

// const { ObjectId } = require('mongodb');

const isValidSale = async(quantity) => {
  const zero = 0;
  if (quantity <= zero || typeof quantity !== 'number') 
    return 'Wrong product ID or invalid quantity';

  return true;
};

const newSale = async(sale) => {
  const notValid = await isValidSale(sale[0].quantity);

  if (notValid !== true) throw new Error(notValid);

  const newSales = await sales.createSale(sale);

  return newSales;

};


module.exports = {
  newSale,
};
