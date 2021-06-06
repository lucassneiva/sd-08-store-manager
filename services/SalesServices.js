const SalesModels = require('../models/SalesModels');
const validations = require('./validationsProduct');

const addSold = async (sale) => {
  const idsArrayIsValid = await validations.getByIdArray(sale);
  const quantitiesArrayIsValid = validations.validateQuantityArray(sale);

  if (idsArrayIsValid) return { erro: idsArrayIsValid };
  if (quantitiesArrayIsValid) return { erro: quantitiesArrayIsValid };

  await SalesModels.addSales(sale);
  const findSale = await SalesModels.findBySale(sale);

  return { message: findSale, code: 200 };
};

module.exports = {
  addSold,
};
