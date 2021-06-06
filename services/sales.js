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

const getAllSales = async () => {
  const allSales = await Sales.getAllSales();

  if (!allSales) {
    return {
      error: {
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      },
    };
  }

  return allSales;
};

const getById = async (id) => {
  let sale;

  if (id.length === MIN_ID_LENGTH) {
    sale = await Sales.getById(id);
  }

  if (!sale || id.length !== MIN_ID_LENGTH) {
    return {
      error: {
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      },
    };
  }

  return sale;
};

const updateById = async (id, body) => {
  const updatedSales = await Sales.updateById(id, body);

  if (!updatedSales) {
    return {
      error: {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      },
    };
  }

  return updatedSales;
};

module.exports = {
  registerSales,
  getAllSales,
  getById,
  updateById
};
