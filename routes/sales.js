const express = require('express');
const router = express.Router();
const {
  createSale,
  listAllSales,
  getSaleById } = require('../controllers/salesController');

router.post('/', createSale);
router.get('/:id', getSaleById);
router.get('/', listAllSales);

module.exports = router;
