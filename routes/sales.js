const express = require('express');
const { controllerSales } = require('../controllers/sales');

const routeSales = express.Router();
const { validateSale } = require('../middlewares/salesMiddleware');

routeSales.post('/sales', validateSale, controllerSales);


module.exports = { routeSales };
