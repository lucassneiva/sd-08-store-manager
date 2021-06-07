const { Router } = require('express');
const {
  registerSale,
  getAllSales,
  findByIdSale,
  updateSale,
  removeSale,
} = require('../middlewares/SalesMiddleware');
const { validateSale } = require('../middlewares/ValidateSaleMiddleware');

const router = Router();

router.get('/', getAllSales);
router.get('/:id', findByIdSale);

router.post('/', [validateSale, registerSale]);

router.put('/:id', [validateSale, updateSale]);

router.delete('/:id', removeSale);

module.exports = router;
