const { salesModel } = require('../models');
const {
  addSales,
  findAllSales,
  findSalesById,
} = salesModel;

const CODE = 'invalid_data';

const readSales = async () => {
  const data = await findAllSales();
  return data;
};

const createSales = async (itensSold) => {
  const validation = await checkItensSold(itensSold);
  if (validation.err) return validation;

  const newSales = await addSales(itensSold);
  return { _id: newSales.insertedId, itensSold };
};

const checkItensSold = async (itensSold) => {
  const QTD = 0;
  const NUMBER_NAME = 5;

  for (const index in itensSold) {
    if (itensSold[index].quantity <= QTD
      || typeof(itensSold[index].quantity) !== 'number') {
      return {
        err: {
          code: CODE,
          message: 'Wrong product ID or invalid quantity',
        }
      };
    }
  }
  
  return true;
};

const readSalesById = async (id) => {
  // const validation = await productNFVF(id);
  // if (validation.err) return validation;

  const result = await findSalesById(id);
  if (!result) return {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  };
  return result;
};

// Será validado que todas as vendas estão sendo retornadas (31 ms)
// Será validado que é possível listar uma determinada venda (23 ms)
// Será validado que não é possível listar uma venda inexistente (9 ms)

module.exports = {
  readSales,
  createSales,
  readSalesById,
};