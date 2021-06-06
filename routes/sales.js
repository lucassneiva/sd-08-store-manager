const express = require('express');
const router = express.Router();
const {
  createSale,
  listAllSales,
  getSaleById,
  deleteSale } = require('../controllers/salesController');

router.post('/', createSale);
router.get('/:id', getSaleById);
router.get('/', listAllSales);
router.delete('/:id', deleteSale);

module.exports = router;
