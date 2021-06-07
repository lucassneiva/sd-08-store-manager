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

const updateSales = async (id, sold) => {
  const getSaleIsValid = await validations.validateSolds(id);
  const quantitiesArrayIsValid = validations.validateQuantityArray(sold);

  if(getSaleIsValid) return { erro: getSaleIsValid };
  if (quantitiesArrayIsValid) return { erro: quantitiesArrayIsValid };

    
  const getById = await SalesModels.findSaleById(id);
  const useMap = getById[0].itensSold;

  const resp = useMap.map((data) => {
    if (data.productId === sold[0].productId) {
      return {
        ...data,
        quantity: sold[0].quantity,
      };
    }
    return data;
  });

  await SalesModels.updateSale(id, resp);
  const updated = await SalesModels.findSaleById(id);

  return { message: updated[0], code: 200 };
};

module.exports = {
  addSold,
  getAllSales,
  getSaleById,
  updateSales,
};
