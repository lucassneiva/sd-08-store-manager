const salesModel = require('../models/salesModels');

const validSale = (sale) => {
  const err = {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    }
  };
  for(let index = 1; index <= sale.length; index += 1) {
    const { quantity } = sale[index - 1];
    if (typeof quantity === 'string' || quantity < 1) return err;
  }
  return false;
};

const create = async (sale) => {
  const saleId = await salesModel.create(sale);
  if (!saleId) return null;
  return ({
    _id: saleId,
    itensSold: [...sale],
  });
};

module.exports =  {
  create,
  validSale,
};
