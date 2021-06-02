const express = require('express');
const router = express.Router();
const controller = require('./controllers/productController');

router.post('/products', controller.createP);

router.get('/products', controller.getAllProducts);

router.get('/products/:id', controller.findById);

router.put('/products/:id', controller.updateProduct);

module.exports = router;
