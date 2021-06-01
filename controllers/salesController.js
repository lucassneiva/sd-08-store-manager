const express = require('express');

const SalesModel = require('../models/salesModel');
const SalesServices = require('../services/salesServices');
const router = express.Router();

const SUCCESS_CODE = 200;
const INVALID_CODE = 422;
const NOT_FOUND_CODE = 404;

router.post('/', async (req, res, _next) => {
  const itens = req.body;

  const validation = await SalesServices.verifySalesItens(itens);
  if (validation) return res.status(INVALID_CODE).json({ err: validation });

  const response = await SalesModel.createSales(itens);

  res.status(SUCCESS_CODE).json(response);
});

router.get('/', async (req, res) => {
  const response = await SalesModel.getSales();

  if (!response) return res.status(NOT_FOUND_CODE).json({ err: 'None sales in DB' });

  res.status(SUCCESS_CODE).json({ sales: response });
});

router.get('/:id', async (req, res, _next) => {
  const { id } = req.params;

  const response = await SalesModel.getSalesById(id);

  if (!response) return res.status(NOT_FOUND_CODE)
    .json({ err: { code: 'not_found', message: 'Sale not found' } });


  res.status(SUCCESS_CODE).json(response);
});

router.put('/:id', async (req, res, _next) => {
  const { id } = req.params;
  const itens = req.body;

  const validation = await SalesServices.verifySalesItens(itens);
  if (validation) return res.status(INVALID_CODE).json({ err: validation });

  const response = await SalesModel.updateSale(id, itens);

  if (!response) return res.status(INVALID_CODE)
    .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });


  res.status(SUCCESS_CODE).json(response);
});


module.exports = router;
