const express = require('express');

const router = express.Router();

const {
  getAllSales,
  getSaleById,
  addSale,
} = require('../models/salesModels');

const STATUS_OK = 200;
const NOT_FOUND = 404;
const ERROR = 500;
const error_message = 'Something is wrong';

router.get('/', async (_req, res) => {
  try {
    const allSales = await getAllSales();
    res.status(STATUS_OK).json({ sales: allSales });
  } catch (err) {
    res.status(ERROR).json(error_message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const saleById = await getSaleById(id);
    if (!saleById) {
      return res
        .status(NOT_FOUND)
        .json({
          err: {
            code: 'not_found',
            message: 'Sale not found'
          }
        });
    }
    res.status(STATUS_OK).json({ saleById });
  } catch (err) {
    res.status(ERROR).json(error_message);
  }
});

router.post('/', async (req, res) => {
  try {
    const itensSold = req.body;
    const newSale = await addSale(itensSold);
    res.status(STATUS_OK).json(newSale.ops[0]);
  } catch (err) {
    res.status(ERROR).json(error_message);
  }
});

router.put('/:id', (_req, res) => {
  res.status(STATUS_OK).send('Update de venda');
});

router.delete('/:id', (_req, res) => {
  res.status(STATUS_OK).send('Deletar venda');
});

module.exports = router;
