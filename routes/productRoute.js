const express = require('express');
const productController = require('../controllers/productController');
const  { validName, ValidQuantity } = require('../middlewares/validations');

const router = express.Router();

router.post('/products', validName, ValidQuantity, productController.addProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);

module.exports = router;
