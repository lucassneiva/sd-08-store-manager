const express = require('express');

const Router = express.Router();

const controllerProduct = require('../controllers/productController');

Router.post('/products', controllerProduct.create);

module.exports = Router;
