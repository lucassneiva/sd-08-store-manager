const productsModel = require('../models/products');

const MIN_QUANTITY = 0;

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

  return _sales;
};

module.exports = {
  saleIsValid,
};
