const express = require('express');
const bodyParser = require('body-parser');
const { checkProduct } = require('../middleware/middleware');

const STATUS_201 = 201;

const { createProduct, findProduct } = require('../models/models');

const router =  express.Router();
router.use(bodyParser.json());

router.post('/', checkProduct,   async (req, res) => {
  const { name, quantity } = req.body;
  createProduct({name, quantity});
  const productFinded = await findProduct({name});
  res.status(STATUS_201).send(productFinded);
});

module.exports = router;
