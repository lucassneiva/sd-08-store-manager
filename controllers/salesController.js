const express = require('express');
const router = express.Router();

const {
  addSales,
  getAllSales,
  getSaleById,
} = require('../services/SalesServices');

const { validateSale } = require('../middlewares/SaleMiddleware');

const OK = 200;
// const UNPROCESSABLE_ENTITY = 422;
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
    console.log(getSales);
    res.status(OK).json({ sales: getSales });
  } catch (err) {
    console.log(err);
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
    console.log(err);
    res.status(ERROR).json({ message });
  }
});

module.exports = router;
