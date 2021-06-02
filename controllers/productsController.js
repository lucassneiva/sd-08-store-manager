const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  addProduct,
  getProductById,
} = require('../services/ProductsServices');
const {
  validateIfNameExists,
  validateProduct,
  validateIfExists,
} = require('../middlewares/ProductMiddleware');

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

router.post('/', validateIfNameExists, validateProduct, async (req, res) => {
  const { name, quantity } = req.body;
  const product = await addProduct(name, quantity);
  return res.status(CREATED).json(product.ops[0]);
});

router.get('/', async (req, res) => {
  const getProducts = await getAllProducts('products');
  res.status(OK).json({ products: getProducts });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);

  if (!product) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  return res.status(OK).json(product);
});

module.exports = router;
