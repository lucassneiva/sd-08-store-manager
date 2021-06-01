const express = require('express');
const productController = require('../controllers/productController');
const  { validName, ValidQuantity } = require('../middlewares/validations');

const router = express.Router();

router.get('/products', productController.getAllProducts);
router.post('/products', validName, ValidQuantity, productController.addProduct);

module.exports = router;
