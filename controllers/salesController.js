const express = require('express');

const router = express.Router();

const Sales = require('../services/salesServices');

const STATUS_OK = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

router.get('/', async (_req, res) => {
  const allSales = await Sales.getAllSales();
  res.status(STATUS_OK).json(allSales);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const saleById = await Sales.getSaleById(id);

  if (saleById.err) {
    return res.status(NOT_FOUND).json(saleById);
  }
});

router.post('/', async (req, res) => {
  const { itensSold } = req.body;
  const newSale = await Sales.addSale(itensSold);

  if (newSale.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(newSale);
  }

  res.status(STATUS_OK).json(newSale);
});

router.put('/:id', (_req, res) => {
  res.status(STATUS_OK).send('Update de venda');
});

router.delete('/:id', (_req, res) => {
  res.status(STATUS_OK).send('Deletar venda');
});

module.exports = router;
