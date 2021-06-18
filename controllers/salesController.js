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

  return res.status(STATUS_OK).json(saleById);
});

router.post('/', async (req, res) => {
  const sales = req.body;
  const newSale = await Sales.addSale(sales);

  if (newSale.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(newSale);
  }

  return res.status(STATUS_OK).json(newSale);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const { productId, quantity } = sale;

  const updatedSale = await Sales.updateSale(id, productId, quantity);

  if (updatedSale.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(updatedSale);
  }

  return res.status(STATUS_OK).json({ updatedSale });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedSale = await Sales.deleteSale(id);

  if (deletedSale.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(deletedSale);
  };

  return res.status(STATUS_OK).json(deletedSale);
});

module.exports = router;
