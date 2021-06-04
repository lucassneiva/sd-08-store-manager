const SaleModel = require('../models/saleModel');
const SaleValidation = require('./saleValidation');

const create = async (products) => {
  await SaleValidation.prductsValidations(products);

  const sale = await SaleModel.create(products);

  return sale;
};

const getAll = async () => {
  const salesData = await SaleModel.getAll();

  return {
    sales: salesData,
  };
};

const findById = async (id) => {  
  await SaleValidation.validateSaleId(id);

  const saleData = await SaleModel.findById(id);
  
  await SaleValidation.validateSaleNotFound(sale);

  return saleData;
};

module.exports = {
  create,
  getAll,
  findById,
};
