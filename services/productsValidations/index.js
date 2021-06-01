const isValidName = require('./validateName');
const isValidQuantity = require('./validateQuantity');
const alreadyExists = require('./validateAlredyExists');

module.exports = {
  isValidName,
  isValidQuantity,
  alreadyExists,
};
