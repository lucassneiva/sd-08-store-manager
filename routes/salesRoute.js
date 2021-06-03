const express = require('express');
const {
  getAllSales,
  addSales,
  getByIdSale,
  updateSale,
  deleteSale
} = require('../controllers/salesController');

const router = express.Router();

router.get('/sales', getAllSales);
router.get('/sales/:id', getByIdSale);
router.post('/sales', addSales);
router.put('/sales/:id', updateSale);
router.delete('/sales/:id', deleteSale);

module.exports = router;