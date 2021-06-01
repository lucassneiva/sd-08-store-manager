const isValidQuantity = (quantity) => {
  const minimumQuantitySize = 1;
  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
        status: 422,
      },
    };
  }
  if (quantity < minimumQuantitySize) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
        status: 422,
      },
    };
  }
  return {};
};

module.exports = isValidQuantity;
