const SaleModel = require('../models/saleModel');
const SaleValidation = require('./saleValidation');

const create = async (products) => {
  await SaleValidation.prductsValidations(products);

  const sale = await SaleModel.create(products);

  return sale;
};

module.exports = {
  create,
};
