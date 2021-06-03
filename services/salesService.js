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
  const insertedId = await createSalesModel(sales);
  if (insertedId == 'not created') return null;
  return ({
    _id: insertedId,
    itensSold: [...sales]
  });
};

module.exports = {
  salesValidation,
  createSalesService,
};
