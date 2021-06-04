const productName  = '"name" length must be at least 5 characters long';
const productQuantityLength  = '"quantity" must be larger than or equal to 1';
const productQuantityIsNotNumber  = '"quantity" must be a number';
const productAlreadyExists  = 'Product already exists';
const productNotFound = 'Wrong id format';
const productInvalidQty = 'Such amount is not permitted to sell';
const saleProductInvalidIdOrQty = 'Wrong product ID or invalid quantity';
const saleNotFound = 'Sale not found';
const saleWrongFormat = 'Wrong sale ID format';
const invalidData = 'invalid_data';
const stockProblem = 'stock_problem';

module.exports = {
  productName,
  productQuantityLength,
  productQuantityIsNotNumber,
  productAlreadyExists,
  productNotFound,
  productInvalidQty,
  saleProductInvalidIdOrQty,
  saleNotFound,
  saleWrongFormat,
  invalidData,
  stockProblem,
};
