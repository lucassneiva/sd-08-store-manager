const {
  postProduct,
  getProducts,
  getProductById,
} = require('../controllers/productsController');

const express = require('express');
const router = express.Router();

router.post('/', postProduct);

router.get('/:id', getProductById);
router.get('/', getProducts);

module.exports = router;
