const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/products', productController.create);
router.get('/products', productController.getAll);
router.get('/products/:id', productController.findById);

module.exports = router;
