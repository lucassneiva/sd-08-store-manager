const { findByName } = require('../models/products');

const isValidLength = (value, min) => (value.length < min);
const isValidQuantity = (value, min) => (value < min);
const isString = (value) => (typeof value === 'string');
const minLenght = 5;
const minQuantity = 1;

const isValidNameQuantity = (name, quantity) => {
  switch (true) {
  case (isValidLength(name, minLenght)):
    return ({
      status: 'invalid_data',
      message: '\"name\" length must be at least 5 characters long'
    });
  case (isValidQuantity(quantity, minQuantity)):
    return ({
      status: 'invalid_data',
      message: '\"quantity\" must be larger than or equal to 1'
    });
  case (isString(quantity)):
    return ({
      status: 'invalid_data',
      message: '\"quantity\" must be a number'
    });
  default: return {};
  };
};

const isValidName = async (name) => {
  const validate = await findByName(name);
  if (validate) {
    return ({
      status: 'invalid_data',
      message: 'Product already exists'
    });
  }
  return true;
};

const isValidId = (id) => {
  const idLength = 24;
  if (id.length < idLength) return true;
  return false;
};

module.exports = {
  isValidNameQuantity,
  isValidId,
  isValidName,
};
