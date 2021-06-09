const Model = require('../models/SalesModel');

const zero = 0;

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

  const hex = /[0-9A-Fa-f]{6}/g;

  if(!hex.test(id)) {
    throw new Error(JSON.stringify({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      },
      http: 404
    }));
  }
  
  const result = await Model.getById(id);
  
  if(!result) {
    throw new Error(JSON.stringify({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      },
      http: 404
    }));;
  }
  return {
    http: 200,
    result
  };

};

const update = async (id, array) => {

  const resultAll = await Model.getAll();

  if(resultAll.some((item) => item._id === id)) {
    throw new Error(JSON.stringify({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      },
      http: 422
    }));
  }

  array.map((item) => {
    if(item.quantity <= zero || typeof(item.quantity) !== 'number') {
      console.log(array.item);
      throw new Error(JSON.stringify({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        },
        http: 422
      }));
    }
  });

  return Model.update(id, array);
};

const deleteSale = async (id) => {

  const hex = /[0-9A-Fa-f]{6}/g;

  if(!hex.test(id)) {
    throw new Error(JSON.stringify({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      },
      http: 422
    }));
  }
  const checkBeforeDelete = await Model.getById(id);

  if (!checkBeforeDelete) {
    throw new Error(JSON.stringify({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      },
      http: 422
    }));
  }

  return Model.deleteSale(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteSale
};
