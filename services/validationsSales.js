const findModelsProducts = require('../models/ProductModels');
const findModelsSales = require('../models/SalesModels');

const NUMBER_ZERO = 0;

const getByIdArray = async (sale) => {
  const getIdsArray = sale
    .every(({ productId }) => {
      const find = findModelsProducts.findOneProductById(productId);
      return find;
    });

  if (!getIdsArray) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
      code: 422,
    };
  };
};

const validateQuantityArray = (sale) => {
  const quantitiesMoreThan = sale.some(({ quantity }) => {
    return quantity <= NUMBER_ZERO;
  });
  const quantitiesIsNumber = sale.some(({ quantity }) => {
    return typeof quantity !== 'number';
  });

  if (quantitiesMoreThan || quantitiesIsNumber) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
      code: 422,
    };
  };
};

const validateSolds = async (id) => {
  const getById = await findModelsSales.findSaleById(id);

  if (!getById) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
      code: 404,
    };
  };
};

const validateSoldsAll = async () => {
    const getAllSales = await findModelsSales.getAllSolds();
  
    if (!getAllSales) {
      return {
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
        code: 404,
      };
    };
  };

module.exports = {
  getByIdArray,
  validateQuantityArray,
  validateSolds,
  validateSoldsAll,
};