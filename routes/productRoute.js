const express = require('express');
const productController = require('../controllers/productController');
const { getName } = require('../middlewarers/productMiddlewarers/nameValidate');
const { getQuantity } = require('../middlewarers/productMiddlewarers/quantityValidade');

const router = express.Router();

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', getName, getQuantity, productController.addProduct);
router.put('/products/:id', getName, getQuantity, productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
