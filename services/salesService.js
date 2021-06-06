const SalesModel = require('../models/salesModel');

const SUCCESS = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTRY = 422;

const create = async (salesMade) => {
  // Será validado que não é possível cadastrar vendas com quantidade menor que zero
  // Será validado que não é possível cadastrar vendas com quantidade igual a zero
  const minQuantity = 1;
  const haveNoMin = salesMade.find((sale) => sale.quantity < minQuantity);

  if (haveNoMin) return ({
    status: UNPROCESSABLE_ENTRY,
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    }
  });

  // Será validado que não é possível cadastrar vendas com uma string no campo quantidade
  const isNotNumber = salesMade.find((sale) => typeof sale.quantity !== 'number');
 
  if (isNotNumber) return ({
    status: UNPROCESSABLE_ENTRY,
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    }
  });

  const sale = await SalesModel
    .create(salesMade);
  
  return {
    status: SUCCESS,
    sale,
  };
};

module.exports = {
  create,
};