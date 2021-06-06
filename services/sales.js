const Sales = require('../models/sales');

const { MIN_ID_LENGTH } = require('../constants');

const registerSales = async (sale) => {
  const register = await Sales.registerSale(sale);

  if (!register) {
    return {
      error: {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      },
    };
  }


  return register;
};

module.exports = {
  registerSales
};
