const ZERO = 0;

const quantityValid = (quantity) => {
  if (!Number.isInteger(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    };
  }
  if (quantity <= ZERO) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    };
  }
  return 'Validated';
};

module.exports = quantityValid;
