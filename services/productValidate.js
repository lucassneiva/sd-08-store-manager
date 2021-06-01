const ProductModel = require('../models/productModel');

const validateAdd = (name, quantity) => {
  const nameIsValid = 5;
  const quantityIsValid = 0;
  switch (true) {
  case (name === undefined || name.length <= nameIsValid):
    return { code: 422, message: '"name" length must be at least 5 characters long' };
  case quantity <= quantityIsValid:
    return { code: 422, message: '"quantity" must be larger than or equal to 1'};
  case isNaN(quantity):
    return { code: 422, message: '"quantity" must be a number' };
  default:
    return {};
  }
};

const addProduct = async (name, quantity) => {
  const validation = validateAdd(name, quantity);
  if(validation.message) return validation;

  if (await ProductModel.nameExists(name)) {
    return { code: 422, message: 'Product already exists'};
  }

  const result = await ProductModel.addProduct(name, quantity);
  
  return { code: 201, result };
};

const getAll = async () => {
  const result = await ProductModel.getAll();
  return { code: 200, result };  
};

const getById = async (id) => {
  const result = await ProductModel.getById(id);
  if (!result) {
    return { code: 422, message: 'Wrong id format' };
  }
  return { code: 200, result };
};

module.exports = { 
  addProduct,
  getAll,
  getById
};
