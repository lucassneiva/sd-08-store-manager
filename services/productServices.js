const { ObjectId } = require('mongodb');
const productModel = require('../models/productsModel');


const TamanhoMin = 5;

const validProduct = ({name,quantity}) => {
  if (name.length < TamanhoMin) return({
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long' }
  });
  if (typeof quantity === 'string') return({
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    }
  });
  if (quantity < 1) return({
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    }
  });
  return null;
};

const addProduct = async (product) => {
  const result = await productModel.addProduct(product);
  if (result === 'found') return ({
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    }
  });
  return result;
};

const getOne = async (id) => {
  const result = await productModel.getOne(id);
  if (!result) return ({
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    }
  });
  return result;
};

const getAll = async () => {
  const result = await productModel.getAll();
  return { result};
};

const updateOne = async (id,product) => {
  const result = await productModel.updateOne(id,product);
  return result;
};


module.exports = {
  validProduct,addProduct,getOne,getAll,updateOne
};
