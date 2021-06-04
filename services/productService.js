const model = require('../models/productModel');

const getAll = async () => model.getAll();

const create = async ({name, quantity}) => {
  const object = await getAll();
  const unico = object.some(element => element.name === name);
  const CINCO = 5;
  const ZERO = 0;
  if (name.length < CINCO) {
    throw {
      'err': {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    };
  }
  if (unico) {
    throw {
      'err': {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    };
  }
  if (Number(quantity) < ZERO) {
    throw {
      'err': {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    };
  }
  if (Number(quantity) === ZERO) {
    throw {
      'err': {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    };
  }
  if (typeof quantity === 'string') {
    throw {
      'err': {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    };
  }
  return model.create(name, quantity);
};

module.exports = {
  getAll,
  create,
};
