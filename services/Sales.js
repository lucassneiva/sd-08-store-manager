const Sales = require('../models/Sales');

const INVALID_QUANTITY_OR_ID = {
  status: 422,
  response: {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    }
  }
};

const INVALID_SALE_ID = {
  status: 422,
  response: {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }
  }
};

const NO_PRODUCTS_FOUND = {
  status: 404,
  response: {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  }
};

const validateFields = (sales) => {
  const invalidQuantity = sales.find(sale => (
    typeof sale.quantity !== 'number' || sale.quantity < 1
  ));

  if (invalidQuantity) return INVALID_QUANTITY_OR_ID;
  return { ok: true };
};

const createSale = async (sales) => {
  const isValid = validateFields(sales);
  if (!isValid.ok) return isValid;

  const newSale = await Sales.createSale(sales);

  return { status: 200, response: newSale };
};

const updateSale = async (id, sales) => {
  const isValid = validateFields(sales);
  if (!isValid.ok) return isValid;

  await Sales.updateSale(id, sales);

  return { status: 200, response: {
    _id: id,
    itensSold: sales,
  } };
};

const deleteSale = async (id) => {
  const deleted = await Sales.deleteSale(id);

  if (!deleted) return INVALID_SALE_ID;
  return { status: 200, response: deleted };
};

const listSales = async (id) => {
  const sales = await Sales.listSales(id);
  if (!sales) return NO_PRODUCTS_FOUND;
  if (id) return { status: 200, response: sales };
  return { status: 200, response: { sales } };
};

module.exports = {
  validateFields,
  createSale,
  updateSale,
  deleteSale,
  listSales,
};

