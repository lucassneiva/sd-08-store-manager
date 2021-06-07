const express = require('express');
const router = express.Router();
const {
  createSale,
  listAllSales,
  getSaleById,
  deleteSale,
  updateSale } = require('../controllers/salesController');

router.post('/', createSale);
router.get('/:id', getSaleById);
router.get('/', listAllSales);
router.delete('/:id', deleteSale);
router.put('/:id', updateSale);

module.exports = router;
