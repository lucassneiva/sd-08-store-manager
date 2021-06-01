const productModel = require('../models/Products');
const productSchema = require('../Schemas/ProductValidator');

const createProducts = async (name, quantity) =>  {
  const validation =  productSchema.productValidator(name, quantity);
  if(validation.err) return validation;
  const nameValidation = await productSchema.validateName(name);
  if (nameValidation.err) return nameValidation;
  const data = await productModel.createProducts(name, quantity);
  return {data};
};

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const findById = async (id) => {
  const data = await productModel.findById(id);
  if(data===null) return {err:{
    code:'invalid_data',
    message:'Wrong id format'
  }
  };

  return {data};
};

const updateProduct = async(id, {name, quantity}) => {
  const validation =  productSchema.productValidator(name, quantity);
  if(validation.err) return validation;
  const data = await productModel.updateProduct(id, {name, quantity});
  return {data}; 
};


const deleteProduct = async(id) => {
  
  const data = await productModel.findById(id);
  if(data===null) return {err:{
    code:'invalid_data',
    message:'Wrong id format'
  }
  };

  const info = await productModel.deleteProduct(id);
  return {info};
};

module.exports = {
  createProducts,
  getAll,
  findById, 
  updateProduct,
  deleteProduct
};