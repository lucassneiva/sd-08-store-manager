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

module.exports = {
  create,
};
