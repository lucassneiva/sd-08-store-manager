const express = require('express');
const router = express.Router();
const { getAll, create } = require('../services/ProductsServices');

const OK = 200;
const CREATED = 201;

router.get('/', async (req, res) => {
  const products = await getAll();
  res.status(OK).json(products);
});

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const addProduct = await create(name, quantity);
  return res.status(CREATED).json(addProduct.ops[0]);
});

module.exports = router;
