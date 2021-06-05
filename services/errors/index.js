const errorMsgs = {
  shortName: '"name" length must be at least 5 characters long',
  alreadyExists: 'Product already exists', 
  invalidQuantity: '"quantity" must be larger than or equal to 1',
  quantityNotNumber: '"quantity" must be a number',
  wrongId: 'Wrong id format',
  wrongIdOrQuantity: 'Wrong product ID or invalid quantity',
};

const generateError = (message) => (
  {
    err: {
      code: 'invalid_data',
      message
    }
  }
);

module.exports = {
  errorMsgs,
  generateError,
};
