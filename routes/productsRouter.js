const express = require('express');

const { productsController } = require('../controllers');
const { productsMiddleware } = require('../middlewares');

const products = express.Router();

products.get('/products', productsController.productsReader);

products.get('/products/:id',
  productsMiddleware.productNotFoundAndValidFormat, productsController.productById);

products.use(productsMiddleware.checkNameAndQuantity);
products.post('/products', productsController.productCreate);

module.exports = products;