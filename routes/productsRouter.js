const express = require('express');

const { productsController } = require('../controllers');
const {
  productCreate,
  productsReader,
  productById,
  productUpdate,
} = productsController;
const { productsServices } = require('../services');
const {
  checkNameAndQuantity,
  productNotFoundAndValidFormat,
} = productsServices;

const products = express.Router();

products.post('/products', productCreate);
products.get('/products', productsReader);
products.get('/products/:id', productById);
products.put('/products/:id', productUpdate);

module.exports = products;