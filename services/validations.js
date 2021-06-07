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

module.exports = async (name, skipUniqueness = false) => {
  checkNameFormat(name);
  if (!skipUniqueness) await checkNameUniqueness(name);
};

module.exports = (quantity) => {
  if (typeof quantity !== 'number') {
    throw generateError('"quantity" must be a number');
  }

  if (quantity < 1) {
    throw generateError('"quantity" must be larger than or equal to 1');
  }
};
