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
  SaleValidation.validateSaleId(id);

  const saleData = await SaleModel.findById(id);
  
  await SaleValidation.validateSaleNotFound(sale);

  return saleData;
};

const update = async (id, newProducts) => {
  SaleValidation.validateUpdateSaleId(id);
  await SaleValidation.prductsValidations(newProducts);

  return await SaleModel.update(id, newProducts);
};

module.exports = {
  create,
  getAll,
  findById,
  update,
};
