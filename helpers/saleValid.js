const saleValidation = (quantity) => {
  const MIN_QTD = 1;
  if (quantity < MIN_QTD || typeof quantity !== 'number') {
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
