const express = require('express');
const router = express.Router();
const {
  addsProduct,
  getsAllProducts,
  getsProductsById,
  updatesProduct,
  deletesProduct,
} = require('../controllers/productsController');

router.post('/', addsProduct );

router.get('/', getsAllProducts);

router.get('/:id', getsProductsById);

router.put('/:id', updatesProduct);

router.delete('/:id', deletesProduct);

module.exports = router;
