const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const getAll = async () => {
  const allSales = await salesModel.getAll();
  return {sales:allSales};
};
const getById = async (id) => {
  const sales = await salesModel.getById(id);

  if (!sales)
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };

  return sales;
};



module.exports =  {
  getAll,getById,
};
