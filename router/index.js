const express = require('express');

const Router = express.Router();

const controllerProduct = require('../controllers/productController');
const controllerSale = require('../controllers/saleController');

const middlewares = require('../middlewares');

//routes products
Router.get('/products/:id', [middlewares.isValidId, controllerProduct.getById]);
Router.get('/products', controllerProduct.getAll);
Router.post('/products', controllerProduct.create);
Router.put('/products/:id', [middlewares.isValidId, controllerProduct.update]);
Router.delete('/products/:id', [middlewares.isValidId, controllerProduct.deleteProduct]);

//routes sales
Router.post('/sales', controllerSale.create);
Router.get('/sales', controllerSale.getAll);

module.exports = Router;
