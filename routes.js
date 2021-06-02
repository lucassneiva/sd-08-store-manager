const express = require('express');
const ProductsController = require('./controllers/ProductsController');
const { name, quantity, duplicate } = require('./services/ProductValidation');
const router = express.Router();

router.post('/products', name, quantity, duplicate, ProductsController.add);
router.get('/products', ProductsController.getAll);
router.get('/products/:id', ProductsController.getOne);
router.put('/products/:id', name, quantity, ProductsController.edit);
module.exports = router;
