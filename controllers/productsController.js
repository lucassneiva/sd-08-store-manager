const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct } = require('../services/ProductsServices');
const {
  validateIfNameExists,
  validateProduct } = require('../middlewares/ProductMiddleware');

const OK = 200;

router.get('/', async (req, res) => {
  const products = await getAllProducts();
  res.status(OK).json(products);
});

router.post('/', validateIfNameExists, validateProduct, async (req, res) => {
  const { name, quantity } = req.body;
  const { code, err, product } = await addProduct(name, quantity);

  if (!product) {
    return res.status(code).json({ err });
  }
  return res.status(code).json(product.ops[0]);
});

module.exports = router;
