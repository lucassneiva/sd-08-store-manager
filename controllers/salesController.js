const express = require('express');
const router = express.Router();

const {
  addSales,
  getAllSales,
  getSaleById,
  updateSale,
} = require('../services/SalesServices');

const { validateSale } = require('../middlewares/SaleMiddleware');

const OK = 200;
const NOT_FOUND = 404;
const ERROR = 500;
const message = 'There is something wrong';

router.post('/', validateSale, async (req, res) => {
  try {
    const itensSold = req.body;
    const sales = await addSales(itensSold);
    res.status(OK).json(sales);
  } catch (err) {
    res.status(ERROR).json({ message });
  }
});

router.get('/', async (req, res) => {
  try {
    const getSales = await getAllSales();
    res.status(OK).json({ sales: getSales });
  } catch (err) {
    res.status(ERROR).json({ message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const getSales = await getSaleById(id);
    if (!getSales) {
      return res.status(NOT_FOUND).json({
        err: {
          code: 'not_found',
          message: 'Sale not found'
        }
      });
    }
    res.status(OK).json({ getSales });
  } catch (err) {
    res.status(ERROR).json({ message });
  }
});

router.put('/:id', validateSale, async (req, res) => {
  try {
    const { id } = req.params;
    const itensSold = req.body;
    const updatedSales = await updateSale(id, itensSold);
    // console.log(updatedSales);
    res.status(OK).json(updatedSales);
  } catch (err) {
    res.status(ERROR).json({ message });
  }
});

module.exports = router;
