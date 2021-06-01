const express = require('express');

const ProductModel = require('../models/productsModel');
const ProductService = require('../services/productsServices');
const router = express.Router();

const SUCCESS_CODE = 200;
const CREATED_CODE = 201;
const INVALID_CODE = 422;
const NOT_FOUND_CODE = 404;

router.post('/', async (req, res, _next) => {
  const { name, quantity } = req.body;

  const validation = await ProductService.validateNewProduct({ name, quantity });
  if (validation) return res.status(INVALID_CODE).json({ err: validation });

  const productExists = await ProductService.verifyIfExists(name);
  if (productExists) return res.status(INVALID_CODE).json({ err: productExists });

  const response = await ProductModel.createProduct({ name, quantity });

  res.status(CREATED_CODE).json(response);
});

router.get('/', async (_req, res, _next) => {
  const response = await ProductModel.getProducts();

  if (!response) return res.status(NOT_FOUND_CODE).json({ err: 'None product in DB' });

  res.status(SUCCESS_CODE).json({ products: response });
});

router.get('/:id', async (req, res, _next) => {
  const { id } = req.params;

  const response = await ProductModel.getProductById(id);

  if (!response) return res.status(INVALID_CODE)
    .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });


  res.status(SUCCESS_CODE).json(response);
});

router.put('/:id', async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const validation = await ProductService.validateNewProduct({ name, quantity });
  if (validation) return res.status(INVALID_CODE).json({ err: validation });

  const response = await ProductModel.updateProduct(id, name, quantity);

  if (!response) return res.status(INVALID_CODE)
    .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });


  res.status(SUCCESS_CODE).json(response);
});

router.delete('/:id', async (req, res, _next) => {
  const { id } = req.params;

  const response = await ProductModel.removeProduct(id);

  if (!response) return res.status(INVALID_CODE)
    .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });


  res.status(SUCCESS_CODE).json(response);
});


module.exports = router;
