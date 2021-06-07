const model = require('../../models/productModel');
const generateError = require('../../utils/generateError');

const MINIMUM_NAME_LENGTH = 5;

checkNameFormat = (name) => {
  if (typeof name !== 'string') {
    throw generateError('"name" must be a string');
  }

  if (name.length < MINIMUM_NAME_LENGTH) {
    throw generateError('"name" length must be at least 5 characters long');
  }
};

checkNameUniqueness = async (name) => {
  const currentProducts = await model.getAll();
  const notUnique = currentProducts
    .map((product) => product.name)
    .some((element) => name === element);

  if (notUnique) {
    throw generateError('Product already exists');
  }
};

module.exports = async (name) => {
  checkNameFormat(name);
  await checkNameUniqueness(name);
};
