const express = require('express');
const { 
  getAllProducts, 
  createProduct,
  getSingleProduct,
  checkName, 
  checkQuantity,
  updateProduct,
  deleteProduct
} = require('../controller/productsController');

const productsRoute = express.Router();

productsRoute.get('/:id', getSingleProduct);

productsRoute.get('/', getAllProducts);

productsRoute.post('/', checkName, checkQuantity, createProduct);

productsRoute.put('/:id', checkQuantity, checkName, updateProduct);

productsRoute.delete('/:id', deleteProduct);

module.exports = productsRoute;