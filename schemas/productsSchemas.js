const errors = {
  invalid_data: 'invalid_data',
  name_length: '"name" length must be at least 5 characters long',
  quantity_not_number: '"quantity" must be a number',
  quantity_number: '"quantity" must be larger than or equal to 1',
};

const messageError = (message) => ({
  err: {
    code: 'invalid_data',
    message,
  },
});

const isValid = (name, quantity ) => {
  const ZERO = 0;
  const FIVE = 5;
  if (typeof name !== 'string') throw new Error(errors.name_not_string);
  if (name.length < FIVE) throw new Error(errors.name_length);
  if (typeof quantity !== 'number') throw new Error(errors.quantity_not_number);
  if (quantity <= ZERO) throw new Error(errors.quantity_number);
  return {};
};


module.exports = {
  isValid,
  messageError,
};
