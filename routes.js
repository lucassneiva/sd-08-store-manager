const express = require('express');
const ProductsController = require('./controllers/ProductsController');
const SalesController = require('./controllers/SalesController');
const { name, quantity, duplicate } = require('./services/ProductValidation');
const { salesNotNull } = require('./services/SalesValidation');
const router = express.Router();

router.post('/products', name, quantity, duplicate, ProductsController.add);
router.get('/products', ProductsController.getAll);
router.get('/products/:id', ProductsController.getOne);
router.put('/products/:id', name, quantity, ProductsController.edit);
router.delete('/products/:id', ProductsController.remove);
router.post('/sales', salesNotNull, SalesController.add);
router.get('/sales', SalesController.getAll);
router.get('/sales/:id', SalesController.getOne);
router.put('/sales/:id', salesNotNull, SalesController.edit);
router.delete('/sales/:id', SalesController.remove);
module.exports = router;
