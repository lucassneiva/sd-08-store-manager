const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');
const {productNameCheck, productQuatityCheck} = require('../services/productService');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_ERROR_SERVER = 500;

router.get('/', async (req, res) => {
  try {
    const products = await productModel.getAll();
    res.status(STATUS_OK).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(STATUS_ERROR_SERVER).send({message: 'Sistema Indisponível'});
  }
});

//Req01
router.post('/', productNameCheck, productQuatityCheck, async (req, res) => {
  const {name, quantity} = req.body;
  try {
    const newProduct = await productModel.add(name, quantity);
    res.status(STATUS_CREATED).json(newProduct);
  } catch (error) {
    console.log(error.message);
    res.status(STATUS_ERROR_SERVER).send({mesage: 'Sistema Indisponível'});
  }
});

module.exports = router;