const MIN_LENGTH_NAME = 5;
const MIN_QUANTITY = 1;

const errors = {
  invalid: 'invalid_data',
  name_length: '"name" length must be at least 5 characters long',
  quantity_number: '"quantity" must be a number',
  quantity_larger: '"quantity" must be larger than or equal to 1',
};

const code = 422;

const validate = (name, quantity) => {
  if (name.length < MIN_LENGTH_NAME) {
    return {
      code,
      err: {
        code: errors.invalid,
        message: errors.name_length,
      },
    };
  }

  if (typeof quantity === 'string') {
    return {
      code,
      err: {
        code: errors.invalid,
        message: errors.quantity_number,
      },
    };
  }

  if (quantity < MIN_QUANTITY) {
    return {
      code,
      err: {
        code: errors.invalid,
        message: errors.quantity_larger,
      },
    };
  }
  return {};
};

module.exports = {
  validate,
};
