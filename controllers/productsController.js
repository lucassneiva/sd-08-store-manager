const express = require('express');

const router = express.Router();

const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../models/productsModels');

const { nameExists, nameFormat, quantityValidation } = require('../services');

const STATUS_OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;
const ERROR = 500;

router.get('/', async (_req, res) => {
  try {
    const allProducts = await getAllProducts();
    res.status(STATUS_OK).json({ products: allProducts });
  } catch (err) {
    res.status(ERROR).json({ message: 'Something is wrong' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productById = await getProductById(id);
    if (!productById) {
      return res.status(UNPROCESSABLE_ENTITY)
        .json({
          err: {
            code: 'invalid_data',
            message: 'Wrong id format'
          }});
    }
    res.status(STATUS_OK).json(productById);
  } catch (err) {
    res.status(ERROR).json({ message: 'Something is wrong' });
  }
});

router.post('/', nameExists, nameFormat, quantityValidation, async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await addProduct(name, quantity);
    res.status(CREATED).json(newProduct.ops[0]);
  } catch (err) {
    res.status(ERROR).json({ message: 'Something is wrong' });
  }
});

router.put('/:id', nameFormat, quantityValidation, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updatedProduct = await updateProduct(id, name, quantity);
    res.status(STATUS_OK).json(updatedProduct);
  } catch (err) {
    res.status(ERROR).json({ message: 'Something is wrong' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productById = await getProductById(id);
    if (!productById) {
      return res.status(UNPROCESSABLE_ENTITY)
        .json({
          err: {
            code: 'invalid_data',
            message: 'Wrong id format'
          }});
    }
    const deletedProduct = await deleteProduct(id);
    res.status(STATUS_OK).json(deletedProduct);
  } catch (err) {
    res.status(ERROR).json({ message: 'Something is wrong' });
  }
});

module.exports = router;
