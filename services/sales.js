const sales = require('../models/sales');

const error = require('../helpers/error');
const success = require('../helpers/success');

const ZERO = 0;
const TWELVE = 12;
const TWENTYFOUR = 24;

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

const getSales = async () => {
  const result = await sales.getSales();
  return result;
};

const getSaleById = async (id) => {
  if (!id || id.length !== TWELVE && id.length !== TWENTYFOUR) {
    return error('Sale not found', 'not_found');
  }
  const result = await sales.getSaleById(id);
  if(!result) return error('Sale not found', 'not_found');
  return result;
};

const updateSale = async (id, itensSold) => {
  const validQuantityValue = itensSold
    .some((i => i.quantity === ZERO || i.quantity < ZERO));

  const validQuantityNumber = itensSold.some((i) => typeof i.quantity !== 'number');
  if (validQuantityValue || validQuantityNumber) {
    return error('Wrong product ID or invalid quantity');
  }

  await sales.updateSale(id, itensSold);

  return success({
    _id: id,
    itensSold,
  });
};

const deleteSale = async (id) => {
  if (!id || id.length !== TWELVE && id.length !== TWENTYFOUR) {
    return error('Wrong sale ID format');
  }
  const sale = await sales.getSaleById(id);
  if(!sale) return error('Sale not found');

  const { deletedCount } = await sales.deleteSale(id);
  if (!deletedCount) {
    return error('Sale not deleted');
  }

  return success(sale);
};

module.exports = {
  addSales,
  getSales,
  getSaleById,
  updateSale,
  deleteSale,
};
