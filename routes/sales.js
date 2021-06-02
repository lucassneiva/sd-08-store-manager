const express = require('express');

const salesRoute = express.Router();

const SalesControllers = require('../controllers/sales');

salesRoute.get('/', SalesControllers.read);
salesRoute.get('/:id', SalesControllers.readById);
salesRoute.post('/', SalesControllers.create);

module.exports = salesRoute;