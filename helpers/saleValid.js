const saleValidation = (quantity) => {
  const MIN_QTD = 1;
  if (quantity < MIN_QTD) {
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
