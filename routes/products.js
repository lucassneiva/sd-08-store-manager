const express = require('express');
const router = express.Router();

const {
  validateProductName,
  productExists,
  validateProductQuantity,
  createProduct,
  findProductById,
  listAllProducts,
  updateProduct,
  deletedProduct,
} = require('../controllers/productsController');

router.post('/',
  validateProductName,
  productExists,
  validateProductQuantity,
  createProduct,
);

router.get('/:id', findProductById);
router.get('/', listAllProducts);

router.put('/:id',
  validateProductName,
  validateProductQuantity,
  updateProduct
);

router.delete('/:id',
  productExists,
  deletedProduct,
);

module.exports = router;
