const sales = require('../models/sales');

const error = require('../helpers/error');
const success = require('../helpers/success');

const ZERO = 0;

const addSales = async (itensSold) => {
  const validQuantityValue = itensSold
    .some((i) =>  i.quantity === ZERO || i.quantity < ZERO);

  const validQuantityNumber = itensSold.some((i) => typeof i.quantity !== 'number');
  if (validQuantityValue || validQuantityNumber) {
    return error('Wrong product ID or invalid quantity');
  }

  const soldRegistered = await sales.addSales(itensSold);

  return success({
    _id: soldRegistered.insertedId,
    itensSold
  });
};

module.exports = {
  addSales,
};
