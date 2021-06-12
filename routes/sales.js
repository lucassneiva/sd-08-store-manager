const express = require('express');
const { controllerSales,
  controllerGetAllSales, 
  controllerGetById } = require('../controllers/sales');

const routeSales = express.Router();
const { validateSale } = require('../middlewares/salesMiddleware');

routeSales.post('/sales', validateSale, controllerSales);
routeSales.get('/sales/:id', controllerGetById);
routeSales.get('/sales', controllerGetAllSales);


module.exports = { routeSales };
