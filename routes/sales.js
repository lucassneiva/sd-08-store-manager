const express = require('express');
const { controllerSales,
  controllerGetAllSales, 
  controllerGetById, 
  controllerUpdate,
  controllerRemove} = require('../controllers/sales');

const routeSales = express.Router();
const { validateSale } = require('../middlewares/salesMiddleware');

routeSales.post('/sales', validateSale, controllerSales);
routeSales.get('/sales/:id', controllerGetById);
routeSales.put('/sales/:id', validateSale, controllerUpdate);
routeSales.delete('/sales/:id', controllerRemove);
routeSales.get('/sales', controllerGetAllSales);


module.exports = { routeSales };
