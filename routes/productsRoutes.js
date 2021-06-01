const express = require('express');
const productController = require('../controllers/productsController');

const router = express.Router();

router.post('/products', productController.newProducts);
router.get('/products', productController.getAll);
router.get('/products/:id', productController.getById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.exclude);

module.exports = router;
