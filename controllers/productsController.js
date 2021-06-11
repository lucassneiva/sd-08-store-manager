const express = require('express');

const router = express.Router();

const Products = require('../services/productsServices');

const STATUS_OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

router.get('/', async (_req, res) => {
  const allProducts = await Products.getAllProducts();
  res.status(STATUS_OK).json(allProducts);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const productById = await Products.getProductById(id);

  if (productById.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(productById);
  }

  return res.status(STATUS_OK).json(productById);
});

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await Products.addProduct(name, quantity);

  if (newProduct.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(newProduct);
  }

  return res.status(CREATED).json(newProduct);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await Products.updateProduct(id, name, quantity);

  if (updatedProduct.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(updatedProduct);
  }

  return res.status(STATUS_OK).json(updatedProduct);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Products.deleteProduct(id);

  if (deletedProduct.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(deletedProduct);
  }

  return res.status(STATUS_OK).json(deletedProduct);
});

module.exports = router;
