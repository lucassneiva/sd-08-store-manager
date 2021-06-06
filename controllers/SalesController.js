const { Router } = require('express');
const {
  registerSale,
  getAllSales,
  findByIdSale
} = require('../middlewares/SalesMiddleware');
const { validateSale } = require('../middlewares/ValidateSaleMiddleware');

const router = Router();

router.get('/', getAllSales);
router.get('/:id', findByIdSale);

router.post('/', [validateSale, registerSale]);

module.exports = router;
