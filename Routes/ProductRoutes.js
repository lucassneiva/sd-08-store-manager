const { Router } = require('express');
const ProductController = require('../Controller/ProductController');

const ProductRoute = Router();

ProductRoute
  
  .post('/', ProductController.createProduct);

module.exports = ProductRoute;
