const express = require('express');

const productsRoute = express.Router();

const ProductControllers = require('../controllers/products');

productsRoute.get('/', ProductControllers.read);
productsRoute.get('/:id', ProductControllers.readById);
productsRoute.post('/', ProductControllers.create);
productsRoute.put('/:id', ProductControllers.update);

module.exports = productsRoute;