const SalesModels = require('../models/SalesModels');
const validations = require('./validationsSales');

const addSold = async (sale) => {
  const idsArrayIsValid = await validations.getByIdArray(sale);
  const quantitiesArrayIsValid = validations.validateQuantityArray(sale);

  if (idsArrayIsValid) return { erro: idsArrayIsValid };
  if (quantitiesArrayIsValid) return { erro: quantitiesArrayIsValid };

  await SalesModels.addSales(sale);
  const findSale = await SalesModels.findBySale(sale);

  return { message: findSale, code: 200 };
};

const getAllSales = async () => {
  const getAllIsValid = await validations.validateSoldsAll();

  if(getAllIsValid) return { erro: getAllIsValid };

  const getAll = await SalesModels.getAllSolds();
  const resp = {
    sales: [...getAll]
  };

  return { message: resp, code: 200 };
};

const getSaleById = async (id) => {
  const getSaleIsValid = await validations.validateSolds(id);

  if(getSaleIsValid) return { erro: getSaleIsValid };
    
  const getById = await SalesModels.findSaleById(id);

  return { message: getById[0], code: 200 };
};

module.exports = {
  addSold,
  getAllSales,
  getSaleById,
};
