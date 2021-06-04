const errors = { // dica do professor do course
  invalid_data: 'invalid_data',
  wrong_quantity: 'Wrong product ID or invalid quantity',
};

const messageError = (message) => ({
  err: {
    code: 'invalid_data',
    message,
  },
});

const messageError_Not_found = (message) => ({
  err: {
    code: 'not_found',
    message,
  },
});

const isValid = (quantity ) => {
  const ZERO = 0;
  if (typeof quantity !== 'number'
    || quantity <= ZERO) throw new Error(errors.wrong_quantity);
  return {};
};


module.exports = {
  isValid,
  messageError,
  messageError_Not_found,
};
