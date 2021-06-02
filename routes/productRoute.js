const express = require('express');
const productController = require('../controllers/productController');
const {
  validName,
  validQuantity,
  validUpdateName
} = require('../middlewares/validations');

const router = express.Router();

router.post('/products', validName, validQuantity, productController.addProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id',
  validUpdateName ,
  validQuantity,
  productController.updateProduct
);

module.exports = router;
