const express = require('express');
const router = express.Router();

const ProductValidate = require('../services/productValidate');
const { ObjectID } = require('mongodb');

// const STATUS_OK = 200;
const STATUS_ERROR = 500;

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

module.exports = router;