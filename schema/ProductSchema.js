const FIVE = 5;
const ONE = 1;

const errors = {
  invalid: 'invalid_data',
  name_length: '"name" length must be at least 5 characters long',
  quantity_number: '"quantity" must be a number',
  quantity_larger: '"quantity" must be larger than or equal to 1',
};

const validate = (name, quantity) => {
  const code = 422;
  if (name.length < FIVE) {
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

  if (quantity < ONE) {
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
