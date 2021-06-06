const errors = {
  message: 'Wrong product ID or invalid quantity',
};

const isNotNumber = (quantity) => (typeof quantity !== 'number');
const isLenghtQLetterThan = (value, min) => (value <= min );

const MIN_LENGTH_QUANTITY = 0;

const getMessage = (sale) => {
  let test = null;
  sale.map(s => {
    if(isLenghtQLetterThan(s.quantity, MIN_LENGTH_QUANTITY)) test = errors.message;
    if(isNotNumber(s.quantity)) test = errors.message;
  });
  return test;
};

const validate = (sale) => {
  const code = 422;

  const message = getMessage(sale);

  if (message) return { code, message };

  return {};
};

module.exports = {
  validate
};
