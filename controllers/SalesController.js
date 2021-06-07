const { Router } = require('express');
const {
  registerSale,
  getAllSales,
  findByIdSale,
  updateSale,
} = require('../middlewares/SalesMiddleware');
const { validateSale } = require('../middlewares/ValidateSaleMiddleware');

const router = Router();

router.get('/', getAllSales);
router.get('/:id', findByIdSale);

router.post('/', [validateSale, registerSale]);

router.put('/:id', [validateSale, updateSale]);

module.exports = router;
