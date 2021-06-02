const express = require('express');
const router = express.Router();
const controller = require('./controllers/productController');
const controllerSales = require('./controllers/salesController');

router.post('/products', controller.createP);

router.get('/products', controller.getAllProducts);

router.get('/products/:id', controller.findById);

router.put('/products/:id', controller.updateProduct);

router.delete('/products/:id', controller.deleteProduct);

router.post('/sales', controllerSales.createSale);

router.get('/sales', controllerSales.getAllSales);

router.get('/sales/:id', controllerSales.findById);

router.delete('/sales/:id', controllerSales.deleteSale);

module.exports = router;
