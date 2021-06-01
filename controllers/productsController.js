const express = require('express');

const ProductModel = require('../models/productsModel');
const ProductService = require('../services/productsServices');
const router = express.Router();

const CREATED_CODE = 201;
const INVALID_CODE = 422;

router.post('/products', async (req, res, _next) => {
  const { name, quantity } = req.body;

  const validation = await ProductService.validateNewProduct({ name, quantity });
  if (validation) return res.status(INVALID_CODE).json({ err: validation });

  const response = await ProductModel.createProduct({ name, quantity });

  res.status(CREATED_CODE).json(response);
});


module.exports = router;
