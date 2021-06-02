const { isValidQuantity } = require('./salesValidation');
const salesModel = require('../models/salesModel');

const insertSale = async (saleArray) => {
  const validatingQuantity = saleArray.map((sale) => isValidQuantity(sale.quantity));
  if (validatingQuantity.some((validate) => validate.err))
    return validatingQuantity.find((error) => error.err);
  const response = await salesModel.insertSale(saleArray);
  return response;
};

module.exports = {
  insertSale,
};
