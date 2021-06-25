const express = require('express');
const productModel = require('../models/products');

const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_ERROR = 500;

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const product = await productModel.addProduct(name, quantity);
    console.log(product);
    return res
      .status(HTTP_STATUS_CREATED)
      .send(product);
  } catch (error) {
    return res
      .status(HTTP_STATUS_ERROR)
      .send(error.message);
  }
});

module.exports = router;
