const {
  postProduct,
  getProducts,
  getProductById,
  putProduct,
} = require('../controllers/productsController');

const express = require('express');
const router = express.Router();

router.post('/', postProduct);

router.get('/:id', getProductById);
router.get('/', getProducts);

router.put('/:id', putProduct);

module.exports = router;
