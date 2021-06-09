const { ObjectId } = require('mongodb');
const Model = require('../models/ProductsModel');

const minimumLength = 5;
const resultLength = 0;
const minimumLengthId = 12;

const create = async (name, quantity) => {

  if (name.length < minimumLength ) {
    throw new Error(JSON.stringify({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      },
      http: 422,
    }));
  };

  const result = await Model.getAll();

  if (result.some((item) => item.name === name)) {
    throw new Error(JSON.stringify({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      },
      http: 422
    }));
  };

  if (quantity <= resultLength) {
    throw new Error(JSON.stringify({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      },
      http: 422,
    }));
  };

  if(typeof(quantity) !== 'number') {
    throw new Error(JSON.stringify({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
      http: 422,
    }));
  }
  return Model.create(name, quantity);
};

const getAll = async () => {
  const result = await Model.getAll();
  return {
    http: 200,
    products: result
  };
};

const getById = async (id) => {

  if(id.length < minimumLengthId) {
    throw new Error(JSON.stringify({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      },
      http: 422
    }));
  }

  const result = await Model.getById(id);

  if(!result) {
    throw new Error(JSON.stringify({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      },
      http: 422
    }));;
  }

  return {
    http: 200,
    result
  };
};

const update = async (id, name, quantity) => {

  if (name.length < minimumLength ) {
    throw new Error(JSON.stringify({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      },
      http: 422,
    }));
  };

  if (quantity <= resultLength) {
    throw new Error(JSON.stringify({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      },
      http: 422,
    }));
  };

  if(typeof(quantity) !== 'number') {
    throw new Error(JSON.stringify({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
      http: 422,
    }));
  }

  return Model.update(id, name, quantity);
};

const deleteProduct = async (id) => {
  if(id.length < minimumLengthId) {
    throw new Error(JSON.stringify({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      },
      http: 422
    }));
  }

  const result = await Model.getAll();

  // const obj = result.find((item) => item.id === id);
  if(result.some((item) => item.id === id)) {
    throw new Error(JSON.stringify({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      },
      http: 422
    }));
  }

  return Model.deleteProduct(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteProduct
};
