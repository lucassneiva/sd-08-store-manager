const errorMsgs = {
  shortName: '"name" length must be at least 5 characters long',
  alreadyExists: 'Product already exists', 
  invalidQuantity: '"quantity" must be larger than or equal to 1',
  quantityNotNumber: '"quantity" must be a number',
  wrongId: 'Wrong id format'
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
