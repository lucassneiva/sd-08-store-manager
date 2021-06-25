const express = require('express');
const router = express.Router();

const productsServices = require('../services/productsService');
const productsModel = require('../models/productsModel');

const CREATED = 201;
const ERR = 500;

router.post('/', productsServices.validateProducts, async(req, res) => {
  try {
    const {name, quantity} = req.body;
    const product = await productsModel.Add(name, quantity);
    res.status(CREATED).json(product.ops[0]);

  } catch (error) {
    res.status(ERR).json('error');
  }
});


module.exports = router;
