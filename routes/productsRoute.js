const express = require('express');
const {
  getAllProducts,
  addProduct,
  getByIdProduct,
} = require('../controllers/productsController');

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getByIdProduct);
router.post('/products', addProduct);

module.exports = router;