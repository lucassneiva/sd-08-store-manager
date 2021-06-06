const { Router } = require('express');
const {
  createProduct,
  getAllProducts,
  findByIdProduct
} = require('../middlewares/ProductsMiddleware');
const { validateProduct } = require('../middlewares/ValidateMiddleware');

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', findByIdProduct);
router.post('/', [validateProduct, createProduct]);

module.exports = router;
