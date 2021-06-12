const productsModel = require('../models/productsModel');

const productsSchema =  require('../schema/productsSchema');

const create =  async (name, quantity) => {

  const { error } =  productsSchema.create.validate({name, quantity});

  if(error) return {
    statusCode: 422,
    code: 'invalid_data',
    message: error.details[0].message,
    error: true
  };

  const existsProduct = await productsModel.getByName(name);

  if(existsProduct) return {
    statusCode: 422,
    code: 'invalid_data',
    message: 'Product already exists',
    error: true
  };

  const {ops} = await productsModel.create(name, quantity);
  return ops[0];
};

const getProducts = async (id = false) => {
  if(!id){
    const products = await productsModel.getAll();
    return products;
  }
  try{
    const product = await productsModel.getById(id);
    return product;
  }catch(err){
    console.error('Wrong id format');
    return {
      statusCode: 422,
      code: 'invalid_data',
      message: 'Wrong id format',
      error: true
    };
  }
};

//getProducts().then(console.log);


module.exports = {
  create,
  getProducts
};
