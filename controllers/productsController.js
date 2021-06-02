const express = require('express');
const validateName = require('../middlewares/validation/validateName');
const validateQuantity = require('../middlewares/validation/validateQuantity');
const router = express.Router();
const ProductsModel = require('../models/productsModel');

const UNPROCESSABLE = 422;
const CREATED = 201;

const ALREADY_EXISTS = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists'
  }
};

router.post(
  '/',
  validateName,
  validateQuantity,
  async (req, res) => {
    const { name, quantity } = req.body;
    const productFound = await ProductsModel.getByName(name);

    if(productFound) {
      return res.status(UNPROCESSABLE).json(ALREADY_EXISTS);
    };

    const insertedProduct = await ProductsModel.add(name, quantity);
    res.status(CREATED).json(insertedProduct.ops[0]);
  });

module.exports = router;
