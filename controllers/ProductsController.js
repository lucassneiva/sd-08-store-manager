const { Router } = require('express');
const {
  createProduct,
  getAllProducts,
  findByIdProduct,
  updateProduct,
  removeProduct
} = require('../middlewares/ProductsMiddleware');
const { validateProduct } = require('../middlewares/ValidateMiddleware');

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', findByIdProduct);

router.post('/', [validateProduct, createProduct]);

router.put('/:id', [validateProduct, updateProduct]);

router.delete('/:id', removeProduct);

module.exports = router;
