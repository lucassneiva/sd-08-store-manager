const model = require('../models/productModel');
const { ObjectId } = require('mongodb');

const getAll = async () => model.getAll();

const getById = async (id) => {
  const product = await model.getAll(id);
  if(!product) {
    throw {
      'err': {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    };
  }
  return product;
};

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

const update = async(id, name, quantity) => {
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
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    };
  }
  if (typeof quantity === 'string') {
    throw {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    };
  }
  return model.update(id, name, quantity);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
