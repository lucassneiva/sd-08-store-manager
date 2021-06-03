const {
  createSalesModel,
  getAllSalesModel,
  getByIdSalesModel,
  updateSalesModel,
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

const getAllSalesService = async () => {
  const sales = await getAllSalesModel();
  return sales;
};

const getByIdSalesService = async (id) => {
  const sale = await getByIdSalesModel(id);
  if (!sale) return ({
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  });
  return sale;
};

const updateSalesService = async (id, sales) => {
  await updateSalesModel(id, sales);
  return ({
    _id: id,
    itensSold: [...sales]
  });
};

module.exports = {
  salesValidation,
  createSalesService,
  getAllSalesService,
  getByIdSalesService,
  updateSalesService,
};
