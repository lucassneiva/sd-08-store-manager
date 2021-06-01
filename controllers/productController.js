const express = require('express');
const router = express.Router();

const ProductValidate = require('../services/productValidate');
const { ObjectID } = require('mongodb');
// const ProductModel = require('../models/productModel');

// const STATUS_OK = 200;
const STATUS_ERROR = 500;

router.get('/', async (_req, res) => {
  const { code, result } = await ProductValidate.getAll();
  res.status(code).json({
    products: result,
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { code, message, result } = await ProductValidate.getById(id);
    if (!result) {
      return res.status(code).json({
        err: {
          code: 'invalid_data',
          message,
        }
      });
    }
    res.status(code).json(result);
  } catch (e) {
    console.error(e);
  }
});

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const { code, message, result } = await ProductValidate.addProduct(name, quantity);
    if (!result) {
      return res.status(code).json({
        err: {
          code: 'invalid_data',
          message,
        }
      });
    }
    res.status(code).json(result);
  } catch (e) {
    res.status(STATUS_ERROR).send({ message: 'Algo deu errado!' });
  }
});

router.put('/:id', async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  try {
    const { 
      code, 
      message, 
      result 
    } =  await ProductValidate.updateProduct(id, name, quantity);
    if (!result) {
      return res.status(code).json({
        err: {
          code: 'invalid_data',
          message,
        }
      });
    }
    res.status(code).json(result);
  } catch (e) {
    console.error(e);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { code, message, result } = await ProductValidate.deleteProduct(id);
    if (!result) {
      return res.status(code).json({
        err: {
          code: 'invalid_data',
          message,
        }
      });
    }
    res.status(code).json(result);
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;