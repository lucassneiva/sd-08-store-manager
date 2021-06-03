const ONE = 1;

const errors = {
  invalid: 'invalid_data',
  invalid_quantity: 'Wrong product ID or invalid quantity',
};

const code = 422;

const validateSale = (itensSold) => {
  const quantity = itensSold;
  if (quantity < ONE) {
    return {
      code,
      err: {
        code: errors.invalid,
        message: errors.invalid_quantity,
      },
    };
  }

  if (typeof quantity !== 'number') {
    return {
      code,
      err: {
        code: errors.invalid,
        message: errors.invalid_quantity,
      },
    };
  }
  return {};
};

module.exports = {
  validateSale,
};
