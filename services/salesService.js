const {
  createSalesModel,
} = require('../models/salesModel');

const salesValidation = (sales) => {

  for (let i = 1; i <= sales.length; i += 1) {
    const { quantity } = sales[i - 1];
    if (typeof quantity !== 'number' || quantity < 1) return ({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  };
  return false;
};

const createSalesService = async (sales) => {
  const id = await createSalesModel(sales);
  if (id == 'not created') return null;
  return ({
    _id: id,
    itemsSold: [...sales]
  });
};

module.exports = {
  salesValidation,
  createSalesService,
};
