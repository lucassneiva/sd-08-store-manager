const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/products',productController.getAll);
router.get('/products/:id',productController.getById);
router.post('/products', productController.addProduct);
router.put('/products/:id', productController.update);

module.exports = router;