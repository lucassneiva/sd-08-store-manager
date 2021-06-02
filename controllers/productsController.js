const express = require('express');
// const validateName = require('../middlewares/validation/validateName');
// const validateQuantity = require('../middlewares/validation/validateQuantity');
const router = express.Router();
const ProductsModel = require('../models/productsModel');
const { addProduct } = require('../services/productServices');

const UNPROCESSABLE = 422;
const CREATED = 201;

// const ALREADY_EXISTS = {
//   err: {
//     code: 'invalid_data',
//     message: 'Product already exists'
//   }
// };

router.post(
  '/',
  async (req, res) => {
    const { name, quantity } = req.body;
    const addedProduct = await addProduct(name, quantity);
    if(addedProduct.err) {
      return res.status(UNPROCESSABLE).json(addedProduct);
    };
    res.status(CREATED).json(addedProduct);
  });

module.exports = router;
