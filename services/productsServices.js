const { ObjectID } = require('bson');
const Joi = require('joi');
const productsModel = require('../models/productsModel');
const CINCO = 5;
const ZERO = 0;

const addProductValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(CINCO).required(),
    quantity: Joi.number().integer().min(1).required()
  });

  return Joi.validate(data, schema);
};

const nameValidation = async (name) => {
  const result = productsModel.findByNameProduct(name);
  return result;
};

const addProduct = async (name, quantity) => {
  const { error } = addProductValidation({ name, quantity });
  const validationName = await nameValidation(name);
  const result = await productsModel.addProduct(name, quantity);

  if(error) return {
    statusCode: 422,
    json: {
      err: {
        code: 'invalid_data',
        message: error.details[0].message,
      }
    }
  };

  if(validationName.length !== ZERO) return {
    statusCode: 422,
    json: {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      }
    }
  };

  return {
    statusCode: 201,
    json: result,
  };
};

const getAllProductsServices =  async () => {
  const getAllProducts = await productsModel.getAllProducts();

  return {
    statusCode: 200,
    json: {
      products: getAllProducts,
    }
  };
};

const getByIdProductsServices = async (id) => {
  const idValid = ObjectID.isValid(id);
    
  if(!idValid) return {
    statusCode: 422,
    json: {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    }
  };
  
  const result = await productsModel.findByIdProducts(id);

  return {
    statusCode: 200,
    json: result[0]
  };
};

const updateProductsServices = async (id, name, quantity) => {
  const { error } = addProductValidation({ name, quantity });

  if(error) return {
    statusCode: 422,
    json: {
      err: {
        code: 'invalid_data',
        message: error.details[0].message,
      }
    }
  };

  const result = await productsModel.updateProducts(id, name, quantity);

  return {
    statusCode: 200,
    json: result
  };
};

const deleteProductsServices = async (id) => {
  const result = await productsModel.deleteProducts(id);

  if(!result) return {
    statusCode: 422,
    json: {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    }
  };

  return {
    statusCode: 200,
    json: result.message,
  };
};

module.exports = {
  addProduct,
  getAllProductsServices,
  getByIdProductsServices,
  updateProductsServices,
  deleteProductsServices
};

