const productsModel = require('../models/productsModel');

const productsSchema =  require('../schema/productsSchema');

const create =  async (name, quantity) => {

  const { error } =  productsSchema.create.validate({name, quantity});

  if(error) return {
    statusCode: 422,
    err: 'invalid_data',
    message: error.details[0].message
  };

  const existsProduct = await productsModel.getByName(name);

  if(existsProduct) return {
    statusCode: 422,
    err: 'invalid_data',
    message: 'Product already exists'
  };

  const {ops} = await productsModel.create(name, quantity);
  return ops[0];
};

module.exports = {
  create,
};
