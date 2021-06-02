const isValidQuantity = (quantity) => {
  const minimumQuantitySize = 1;
  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
        status: 422,
      },
    };
  }
  if (quantity < minimumQuantitySize) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
        status: 422,
      },
    };
  }
  return {};
};

module.exports = isValidQuantity;
