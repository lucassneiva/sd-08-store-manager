const express = require('express');

const { productsController, salesController } = require('../controllers');
const {
  productCreate,
  productsReader,
  productById,
  productUpdate,
  productDelete,
} = productsController;
const {
  salesCreate,
} = salesController;

const products = express.Router();

products.post('/products', productCreate);
products.get('/products', productsReader);
products.get('/products/:id', productById);
products.put('/products/:id', productUpdate);
products.delete('/products/:id', productDelete);

products.post('/sales', salesCreate);

module.exports = products;