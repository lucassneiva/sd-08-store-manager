
const MIN_QUANTITY = 1;

const errors = {
  invalid: 'invalid_data',
  invalid_quantity: 'Wrong product ID or invalid quantity',
};

const code = 422;

const validateFields = (sales) => {
  const invalidQuantity = sales.find(sale => (
    typeof sale.quantity !== 'number' || sale.quantity < 1
  ));
  
  if (invalidQuantity) return {
    code,
    err: {
      code: errors.invalid,
      message: errors.invalid_quantity,
    },
  };
  return true;
};


module.exports = {
  validateFields
};
