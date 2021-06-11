const SalesModel = require('../Model/SalesModel');
const { StatusCodes } = require('http-status-codes');

const createSale = async (name, quantity) => {
  const result = await SalesModel.createSale(name, quantity);

  return result;
};

const getAllSales = async () => {
  const getInput = await SalesModel.getAllSales();
  const result = { Sales: [...getInput] };
  return result;
};

const getOneSale = async (id) => {
  const result = await SalesModel.getOneSale(id);
  if (result === null)
    return {
      isError: true,
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
      status: StatusCodes.UNPROCESSABLE_ENTITY,
    };
  return result;
};

const updateSale = async (id, name, quantity) => {
  if (result === null)
    return {
      isError: true,
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
      status: StatusCodes.UNPROCESSABLE_ENTITY,
    };
  return result;
};

const deleteSale = async (id) => {
  const sale = await SalesModel.deleteSale(id);
  if (sale === null)
    return {
      isError: true,
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
      status: StatusCodes.UNPROCESSABLE_ENTITY,
    };

  return sale;
};

module.exports = { createSale, getAllSales, getOneSale, updateSale, deleteSale };
