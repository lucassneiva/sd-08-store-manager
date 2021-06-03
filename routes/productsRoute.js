const express = require('express');
const {
  getAllProducts,
  addProduct,
  getByIdProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productsController');

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getByIdProduct);
router.post('/products', addProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;