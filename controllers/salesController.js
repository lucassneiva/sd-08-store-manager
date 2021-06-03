const express = require('express');
const router = express.Router();

const {
  addSales,
} = require('../services/SalesServices');

const { validateSale } = require('../middlewares/SaleMiddleware');

const OK = 200;
const UNPROCESSABLE_ENTITY = 422;
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

module.exports = router;
