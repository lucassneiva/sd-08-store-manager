const MINIMUM_LENGTH = 5;
const MINIMUM_QUANTITY = 1;
const HTTP_STATUS_UNPROCESSABLE_ENTITY = 422;

const validateName = async (name) => {
  if (name.length < MINIMUM_LENGTH)
    return {
      status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };

  return { isValid: true };
};

const validateQuantity = (quantity) => {
  if (quantity < MINIMUM_QUANTITY)
    return {
      status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };

  if (typeof quantity === 'string')
    return {
      status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };

  return { isValid: true };
};

module.exports = {
  validateName,
  validateQuantity,
};
