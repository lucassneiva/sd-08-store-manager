const errors = {
  name_repeat: 'Product already exists',
  name_length: '"name" length must be at least 5 characters long',
  quantity_not_number: '"quantity" must be a number',
  quantity_length: '"quantity" must be larger than or equal to 1',
};

const isNotRepeat = async(name, data) => {
  const nameRepeat = await data().then(nFilter => nFilter.find(n => (n.name === name)));
  if(nameRepeat) return true;
};
const isNotNumber = (quantity) => (typeof quantity !== 'number');
const isLenghtNLetterThan = (value, min) => (value.length < min );
const isLenghtQLetterThan = (value, min) => (value <= min );

const MIN_LENGHT_NAME = 5;
const MIN_LENGHT_QUANTITY = 0;

const getMessage = async(name, quantity, data) => {
  switch (true) {
  case isLenghtNLetterThan(name, MIN_LENGHT_NAME): return errors.name_length;
  case await isNotRepeat(name, data): return errors.name_repeat;
  case isLenghtQLetterThan(quantity, MIN_LENGHT_QUANTITY): return errors.quantity_length;
  case isNotNumber(quantity): return errors.quantity_not_number;
  default: return null;
  }
};

const validate = async(name, quantity, data) => {
  const code = 422;

  const message = await getMessage(name, quantity, data);

  if (message) return { code, message };
  
  return {};
};
  
module.exports = {
  validate
};
