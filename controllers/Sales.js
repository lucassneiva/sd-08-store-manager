const models = require('../models/Sales');
const { quantS, noexistS } = require('../services');
const { Router } = require('express');
const OK = '200';
const CREATED = '201';

const salesController = Router();

salesController.get('/', async (_req, res) => {
  const sales = await models.getAll();
  res.status(OK).json({ sales });
});

salesController.post('/', quantS, async (req, res) => {
  const itensSold = req.body;
  const sales = await models.create(itensSold);
  res.status(OK).json(sales.ops[0]);
});

salesController.get('/:id', noexistS, async (req, res) => {
  const { id } = req.params;
  const product = await models.getSale(id);
  res.status(OK).json(product);
});

module.exports = salesController;