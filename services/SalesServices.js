const Model = require('../models/SalesModel');

const zero = 0;
const minimumLengthId = 12;

const create = async (array) => {
  array[0].itensSold.map((item) => {
    if(item.quantity <= zero || typeof(item.quantity) !== 'number' ) {
      throw new Error(JSON.stringify({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        },
        http: 422
      }));
    } 
  });

  return Model.create(array);
};

const getAll = async () => {
  const result = await Model.getAll();
  return {
    http: 200,
    sales: result
  };
};

const getById = async (id) => {
  const result = await Model.getById(id);

  // console.log(result)

  if(id.length < minimumLengthId) {
    throw new Error(JSON.stringify({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      },
      http: 422
    }));
  }

  if(!result || result === null) {
    throw new Error(JSON.stringify({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      },
      http: 422
    }));;
  }
  return {
    http: 200,
    result
  };

};

module.exports = {
  create,
  getAll,
  getById
};
