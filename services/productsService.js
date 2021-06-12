const productsModel = require('../models/productsModel');

const productsSchema = require('../schema/productsSchema');

const create = async (name, quantity) => {
  const { error } = productsSchema.product.validate({ name, quantity });

  if (error) return {
    statusCode: 422,
    code: 'invalid_data',
    message: error.details[0].message,
    error: true
  };

  const existsProduct = await productsModel.getByName(name);

  if (existsProduct) return {
    statusCode: 422,
    code: 'invalid_data',
    message: 'Product already exists',
    error: true
  };

  const { ops } = await productsModel.create(name, quantity);
  return ops[0];
};

const getProducts = async (id = false) => {
  if (!id) {
    const result = await productsModel.getAll();
    return result;
  }
  try {
    const product = await productsModel.getById(id);
    return product;
  } catch (err) {
    console.error('Wrong id format');
    return {
      statusCode: 422,
      code: 'invalid_data',
      message: 'Wrong id format',
      error: true
    };
  }
};

const update = async (id, dataForUpdate) => {
  const { error } = productsSchema.product.validate(dataForUpdate);

  if (error) return {
    statusCode: 422,
    code: 'invalid_data',
    message: error.details[0].message,
    error: true
  };

  const result = await productsModel.update(id, dataForUpdate);
  if (result !== undefined)
    return { _id: id, ...dataForUpdate };
};

const remove = async (id) => {
  try {
    await productsModel.getById(id);

  }catch (err){
    console.error('Wrong id format');
    return {
      statusCode: 422,
      code: 'invalid_data',
      message: 'Wrong id format',
      error: true
    };
  };
  // o get by id deveria ficar dentro, ou usar outro serviço do git by id

  const result = await productsModel.remove(id);
  return result; 
};

// update('60c5077010eb4f4916417f9b', { name: 'macarrao', quantity: 8}).then(console.log);
//create('cafezinho', 10).then(console.log);
//remove('60c520515e844a7ef5dc1fd4').then(console.log);
//getProducts().then(console.log);

// productsModel.getById('60c52f3654ab819a35f224f').then(console.log).catch(() => console.log('Deu erro'));

module.exports = {
  create,
  getProducts,
  update,
  remove
};
