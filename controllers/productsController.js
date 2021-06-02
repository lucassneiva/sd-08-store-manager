const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  addProduct,
  getProductById,
  updateProduct,
} = require('../services/ProductsServices');
const {
  validateIfNameExists,
  validateProduct,
} = require('../middlewares/ProductMiddleware');

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;
const ERROR = 500;

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

router.put('/:id', validateProduct, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await updateProduct(id, name, quantity);
    return res.status(OK).json(product);
  } catch (err) {
    return res.status(ERROR).json({ message: 'There is something wrong' });
  }

});

module.exports = router;
