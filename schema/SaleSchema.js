const ONE = 1;

const errors = {
  invalid: 'invalid_data',
  invalid_quantity: 'Wrong product ID or invalid quantity',
};

const code = 422;

const validateSale = (quantity) => {
  if (quantity < ONE) {
    return {
      code,
      err: {
        code: errors.invalid,
        message: errors.invalid_quantity,
      },
    };
  }

  if (typeof quantity === 'string') {
    return {
      code,
      err: {
        code: errors.invalid,
        message: errors.invalid_quantity,
      },
    };
  }
};

module.exports = {
  validateSale,
};
