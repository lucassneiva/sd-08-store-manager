const model = require('../../models/productModel');
const HTTP = require('../../utils/httpStatusCodes');
const generateError = require('../../utils/generateError');

const MINIMUM_NAME_LENGTH = 5;

checkNameFormat = (name) => {
  if (typeof name !== 'string') {
    throw {
      status: HTTP.UNPROCESSABLE,
      result: generateError('"name" must be a string'),
    };
  }

  if (name.length < MINIMUM_NAME_LENGTH) {
    throw {
      status: HTTP.UNPROCESSABLE,
      result: generateError('"name" length must be at least 5 characters long'),
    };
  }
};

checkNameUniqueness = async (name) => {
  const currentProducts = await model.getAll();
  const notUnique = currentProducts
    .map((product) => product.name)
    .some((element) => name === element);

  if (notUnique) {
    throw {
      status: HTTP.UNPROCESSABLE,
      result: generateError('Product already exists'),
    };
  }
};

const checkName = async (name) => {
  checkNameFormat(name);
  await checkNameUniqueness(name);
};

const checkQuantity = (quantity) => {
  if (typeof quantity !== 'number') {
    throw {
      status: HTTP.UNPROCESSABLE,
      result: generateError('"quantity" must be a number'),
    };
  }

  if (quantity < 1) {
    throw {
      status: HTTP.UNPROCESSABLE,
      result: generateError('"quantity" must be larger than or equal to 1'),
    };
  }
};

module.exports = async (product) => {
  try {
    await checkName(product.name);
    checkQuantity(product.quantity);

    return {
      status: HTTP.CREATED,
      result: await model.create(product),
    };
  } catch (err) {
    return err;
  }
};
