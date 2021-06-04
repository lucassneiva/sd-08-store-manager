const { salesModel } = require('../models');
const {
  addSales,
} = salesModel;

const CODE = 'invalid_data';

const readSales = async () => {
  const data = await findAllProducts();
  return data;
};

const createSales = async (itensSold) => {
  const validation = await checkItensSold(itensSold);
  if (validation.err) return validation;

  console.log(validation);

  return { itensSold };
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

module.exports = {
  readSales,
  createSales,
};