const { ObjectID } = require('mongodb');
const { productsServices } = require('../services');
const { productsModel } = require('../models');


const UNPROCESSABLE = 422;
const CODE = 'invalid_data';

const checkNameAndQuantity = async (req, res, next) => {
  const { name, quantity } = req.body;
  const QTD = 0;
  const NUMBER_NAME = 5;
  if (!name) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: CODE,
        message: 'Wrong id format',
      }
    });
  }
  if (name.length <= NUMBER_NAME) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: CODE,
        message: '"name" length must be at least 5 characters long',
      }
    });
  }
  if (typeof(name) !== 'string') {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: CODE,
        message: 'O nome deve ser uma string',
      }
    });
  }
  if (!quantity) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: CODE,
        message: '"quantity" must be larger than or equal to 1',
      }
    });
  }
  if (typeof(quantity) !== 'number') {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: CODE,
        message: '"quantity" must be a number',
      }
    });
  }
  if (quantity < QTD) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: CODE,
        message: '"quantity" must be larger than or equal to 1',
      }
    });
  }
  if (!Number.isInteger(quantity)) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: CODE,
        message: 'A quantidade deve ser um número inteiro',
      }
    });
  }
  const productsList = await productsServices.readProducts();
  const productsListFind = productsList.find(product => product.name === name);
  if (productsListFind) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: CODE,
        message: 'Product already exists',
      }
    });
  }
  next();
};

const productNotFoundAndValidFormat = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: CODE,
        message: 'Wrong id format',
      }
    });
  }
  const product = await productsModel.readId(id);
  if (!product) {
    return res.status(UNPROCESSABLE).json({
      err: {
        code: CODE,
        message: 'Product not found',
      }
    });
  }

  next();
};

module.exports = {
  checkNameAndQuantity,
  productNotFoundAndValidFormat,
};