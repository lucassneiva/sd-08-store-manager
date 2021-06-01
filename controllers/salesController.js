const express = require('express');

const SalesModel = require('../models/salesModel');
const SalesServices = require('../services/salesServices');
const router = express.Router();

const SUCCESS_CODE = 200;
const INVALID_CODE = 422;

router.post('/', async (req, res, _next) => {
  const itens = req.body;

  const validation = await SalesServices.verifySalesItens(itens);
  if (validation) return res.status(INVALID_CODE).json({ err: validation });

  const response = await SalesModel.createSales(itens);

  res.status(SUCCESS_CODE).json(response);
});


module.exports = router;
