const express = require('express');
const router = express.Router();
const rescue = require('express-rescue');
const ProductsService = require('../services/productsService');
const INVALID_ERR = 422;
const CREATED = 201;

const validateProductName = (req, res, next) => {
  const { name } = req.body;
  const minLength = 5;
  if (!name || name.length < minLength) return res.status(INVALID_ERR).json({
    err: {
      code: 'invalid_data',
      'message': '"name" must be at least 5 characters long'
    }
  });
  next();
};

const productExists = rescue(async (req, res, next) => {
  const { name } = req.body;
  const product = await ProductsService.findByName(name);
  if (product) return res.status(INVALID_ERR).json({
    err: {
      code: 'invalid_data',
      'message': 'Product already exists'
    }
  });
  next();
});

const validateProductQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') return res.status(INVALID_ERR).json({
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    }
  });
  if (quantity < 1) return res.status(INVALID_ERR).json({
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    }
  });
  next();
};

const createProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await ProductsService.create(name, quantity);
  res.status(CREATED).json(newProduct);
});

router.post('/products',
  validateProductName,
  productExists,
  validateProductQuantity,
  createProduct,
);

module.exports = router;