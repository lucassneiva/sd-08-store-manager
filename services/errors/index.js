const errorMsgs = {
  shortName: '"name" length must be at least 5 characters long',
  alreadyExists: 'Product already exists', 
  invalidQuantity: '"quantity" must be larger than or equal to 1',
  quantityNotNumber: '"quantity" must be a number',
  wrongId: 'Wrong id format',
  wrongIdOrQuantity: 'Wrong product ID or invalid quantity',
  saleNotFound: 'Sale not found',
  wrongSaleIdFormat: 'Wrong sale ID format'
};

const errorCodes = {
  NOT_FOUND_ERR: 'not_found',
};

const generateError = (message, code = 'invalid_data') => (
  {
    err: {
      code: code,
      message
    }
  }
);

module.exports = {
  errorMsgs,
  generateError,
  errorCodes,
};
