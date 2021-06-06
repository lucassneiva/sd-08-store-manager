const express = require('express');

const Router = express.Router();

const controllerProduct = require('../controllers/productController');

const middlewares = require('../middlewares');

Router.get('/products/:id', [middlewares.isValidId, controllerProduct.getById]);
Router.get('/products', controllerProduct.getAll);
Router.post('/products', controllerProduct.create);

module.exports = Router;
