const express = require('express');

const { productsController } = require('../controllers');
const { productsMiddleware } = require('../middlewares');

const products = express.Router();

products.use(productsMiddleware.checkNameAndQuantity);

products.post('/products', productsController.productCreate);

module.exports = products;