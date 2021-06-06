const { Router } = require('express');
const {
  registerSale,
  getAllSales,
} = require('../middlewares/SalesMiddleware');
const { validateSale } = require('../middlewares/ValidateSaleMiddleware');

const router = Router();

router.get('/', getAllSales);

router.post('/', [validateSale, registerSale]);

module.exports = router;
