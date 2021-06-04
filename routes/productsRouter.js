const express = require('express');

const { productsController } = require('../controllers');
const {
  productCreate,
  productsReader,
  productById,
  productUpdate,
  productDelete,
} = productsController;

const products = express.Router();

products.post('/products', productCreate);
products.get('/products', productsReader);
products.get('/products/:id', productById);
products.put('/products/:id', productUpdate);
products.delete('/products/:id', productDelete);

module.exports = products;