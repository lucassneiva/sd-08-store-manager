const express = require('express');
const bodyParser = require('body-parser');

const { insertSales } = require('../models/models');

const { checkSalesCadastre } = require('../middleware/checkSales');

const router =  express.Router();
router.use(bodyParser.json());

const STATUS_201 = 201;
const STATUS_200 = 200;

router.post('/', checkSalesCadastre, async (req, res) => {
  const sales  = req.body;
  const log = await insertSales(sales);
  // console.log('sales 17',log);
  res.status(STATUS_200).json(log);
});

module.exports = router;
