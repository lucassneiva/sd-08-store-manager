const express = require('express');

const salesRoute = express.Router();

const SalesControllers = require('../controllers/sales');

salesRoute.post('/', SalesControllers.create);

module.exports = salesRoute;