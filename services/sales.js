const productsModel = require('../models/products');
const salesModel = require('../models/sales');

const MIN_QUANTITY = 0;
const REQUIRED_LENGTH = 24;

const saleIsValid = (sales) => {
  if (Array.isArray(sales) === false) sales = [sales];
  if (
    sales.every(({ id, quantity }) => {
      const product = productsModel.findProduct(id);
      return product === null || quantity <= MIN_QUANTITY || typeof quantity !== 'number';
    })
  ) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }
  const _sales = { itensSold: sales };

  if (sales.itensSold) return sales;

  return _sales;
};

const idIsValid = async (id) => {
  if (id.length === REQUIRED_LENGTH) {
    const sales = await salesModel.findSale(id);
    if (sales === null) {
      return {
        err: { code: 'not_found', message: 'Sale not found' },
      };
    }
    return sales;
  }

  return {
    err: { code: 'not_found', message: 'Sale not found' },
  };
};

const deleteIdIsValid = async (id) => {
  if (id.length === REQUIRED_LENGTH ) {
    const sales = await salesModel.findSale(id);
    if (sales === null) {
      return {
        err: { code: 'invalid_data', message: 'Wrong sale ID format' },
      };
    }
    return sales;
  }

  return {
    err: { code: 'invalid_data', message: 'Wrong sale ID format' },
  };
};

const updateSaleIsValid = (sales) => {
  if (Array.isArray(sales) === false) sales = [sales];
  if (
    sales.every(({ id, quantity }) => {
      const product = productsModel.findProduct(id);
      return product === null || quantity <= MIN_QUANTITY || typeof quantity !== 'number';
    })
  ) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }

  return sales;
};

module.exports = {
  saleIsValid,
  idIsValid,
  updateSaleIsValid,
  deleteIdIsValid
};
