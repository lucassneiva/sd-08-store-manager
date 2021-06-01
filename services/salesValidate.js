const salesModel = require('../models/salesModel');

const validate = (quantity) => {
  const quantityIsValid = 0;
  switch (true) {
  case quantity <= quantityIsValid:
    return { code: 422, message: 'Wrong product ID or invalid quantity'};
  case isNaN(quantity):
    return { code: 422, message: 'Wrong product ID or invalid quantity' };
  default:
    return {};
  }
};

const addSalesProductValidated = async (sales) => {
  const indexZero = 0;
  for (let index = indexZero; index < sales.length; index++) {
    const { quantity } = sales[index];
    const validation = validate(quantity);
    if(validation.message) return validation;
  }

  const result = await salesModel.addSalesProduct(sales);
  
  return { code: 200, result };
};

module.exports = {
  addSalesProductValidated
};
