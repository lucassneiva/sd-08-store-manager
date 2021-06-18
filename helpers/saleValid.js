const saleValidation = (quantity) => {
  const ZERO = 0;
  if (quantity <= ZERO) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }
  if (!Number.isInteger(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }
  return 'validated';
};

module.exports = saleValidation;
