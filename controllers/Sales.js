const models = require('../models/Sales');
const { quantS } = require('../services');
const { Router } = require('express');
const OK = '200';
const CREATED = '201';

const salesController = Router();

salesController.get('/', async (_req, res) => {
  const sales = await models.getAll();
  res.status(OK).json(sales);
});

salesController.post('/', quantS, async (req, res) => {
  const { itensSold } = req.body;
  const sales = await models.create(itensSold);
  res.status(CREATED).json(sales.ops[0]);
});

module.exports = salesController;